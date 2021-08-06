import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
/*
Data Service handles a websocket connection to the robot.
 */
export class DataService {
  private sockets: WebSocket[] = [undefined, undefined];
  paused: boolean = false;
  private connected: boolean;
  dead: boolean = false;
  callbacks: any = {};
  targetPath: string;
  logs: any[] = [];
  pageData: any;
  robotData: any;

  constructor(private router: Router) {
    this.setConnected(false);

    //Make WebSockets
    this.makeWebSocket('ws://localhost:5804', 1).then();
    this.makeWebSocket('ws://10.51.4.2:5804', 2).then();

    //Listen to URL Changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateURLToRobot(event.url);
      });
  }

  async makeWebSocket(url: string, index: number) {
    try {
      if (this.dead) {
        return;
      }

      this.sockets[index] = new WebSocket(url);
      this.sockets[index].onmessage = (evt) => {
        this.onMessage(evt);
      };
      this.sockets[index].onopen = (evt) => {
        this.onOpen(evt);
      }
      this.sockets[index].onclose = (evt) => {
        this.onClose(evt);
        this.makeWebSocket(url, index);
      };
      this.sockets[index].onerror = (evt) => {
      };
    } catch (e) { console.error(e); }
  }

  onMessage(evt): void {
    try {
      if (this.dead || this.paused) {
        return;
      }

      const newData = JSON.parse(evt.data);

      if ('die' in newData) {
        this.router.navigate(["/dead"]).then();
        this.dead = true;
        return;
      }
      if ('robotData' in newData) {
        if (this.isConnected() === false) {
          this.setConnected(true);
          this.updateURLToRobot(undefined);
        }
        if (this.robotData === undefined) {
          this.robotData = newData.robotData;
        }
        else Object.assign(this.robotData, newData.robotData);
      }
      if ('pageData' in newData) {
        if (newData.pageData.url === this.router.url) {
          delete newData.pageData.url;
          if (!this.deepEquals(this.pageData, newData.pageData)) {
            this.pageData = newData.pageData;
            console.log(this.pageData);
            if (this.callbacks.updatePageData) {
              this.callbacks.updatePageData();
            }
          }
        }
        else {
          this.pageData = undefined;
          if (this.callbacks.updatePageData) {
            this.callbacks.updatePageData();
          }
        }
      }
      if ('trajectory' in newData) {
        if (this.callbacks.trajectory) {
          this.callbacks.trajectory(newData.trajectory);
        }
      }
      if ('odometry' in newData) {
        if (this.callbacks.odometry) {
          this.callbacks.odometry(newData.odometry);
        }
      }
      if ('targetPath' in newData) {
        this.targetPath = newData.targetPath;
        if (this.callbacks.updateTargetPath) {
          this.callbacks.updateTargetPath();
        }
      }
      if ('logs' in newData) {
        //group last log with new log
        function logEqual(log1, log2) {
          return log1?.trace[0]?.className === log2?.trace[0]?.className &&
              log1?.trace[0]?.lineNumber === log2?.trace[0]?.lineNumber &&
              log1?.type === log2?.type
        }
        if (this.logs.length > 0 && newData.logs.length === 1 &&
            logEqual(this.logs[this.logs.length - 1], newData.logs[newData.logs.length - 1])) {
          this.logs[this.logs.length - 1] = newData.logs[newData.logs.length - 1];
          newData.logs.pop();
        }

        //add in new logs
        else {
          this.logs.push(...newData.logs);
        }
      }

      // TODO: handle other data
    } catch (e) { console.error(e); }
  }

  async send(jsonString: string) {
    if (this.isConnected() && this.getCurrentSocket()) {
      this.getCurrentSocket().send(jsonString);
    }
  }

  onOpen(evt): void {
    //close old sockets
    for (let socket of this.sockets) {
      if (socket && socket !== evt.target && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    }
  }

  onClose(evt): void {
    if (!this.getCurrentSocket()) {
      this.setConnected(false);
      this.pageData = undefined;
      this.robotData = undefined;
    }
  }

  getCurrentSocket(): WebSocket {
    for (let socket of this.sockets) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        return socket;
      }
    }
    return undefined;
  }

  setConnected(connected: boolean) {
    this.connected = connected;
    if (connected) {
      this.logs = [];
      if (this.callbacks.connected) {
        this.callbacks.connected();
      }
    }
  }

  isConnected() {
    return this.connected && !this.dead;
  }

  updateURLToRobot(newUrl: string): void {
    if (this.isConnected()) {
      const url = newUrl || this.router.url;
      this.send(JSON.stringify({ url }));
    }
  }

  deepEquals(x, y): boolean {
    // lol https://stackoverflow.com/questions/40597658/equivalent-of-angular-equals-in-angular2
    if (x === y) {
      return true; // if both x and y are null or undefined and exactly the same
    } else if (!(x instanceof Object) || !(y instanceof Object)) {
      return false; // if they are not strictly equal, they both need to be Objects
    } else if (x.constructor !== y.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test their constructor.
      return false;
    } else {
      for (const p in x) {
        if (!x.hasOwnProperty(p)) {
          continue; // other properties were tested using x.constructor === y.constructor
        }
        if (!y.hasOwnProperty(p)) {
          return false; // allows to compare x[ p ] and y[ p ] when set to undefined
        }
        if (x[p] === y[p]) {
          continue; // if they have the same strict value or identity then they are equal
        }
        if (typeof (x[p]) !== 'object') {
          return false; // Numbers, Strings, Functions, Booleans must be strictly equal
        }
        if (!this.deepEquals(x[p], y[p])) {
          return false;
        }
      }
      for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    }
  }
}
