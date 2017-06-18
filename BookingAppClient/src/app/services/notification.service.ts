// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { LocationService } from '../location.services';

// declare the global variables  
declare var $: any;

@Injectable()
export class NotificationService {
    // Declare the variables  
    private proxy: any;
    private proxyName: string = 'notifications';
    private connection: any;

    // create the Event Emitter  
    public notificationReceived: EventEmitter<string>;
    public connectionEstablished: EventEmitter<Boolean>;
    public timeReceived: EventEmitter<string>;
    public connectionExists: Boolean;

    constructor(
        private http: Http,
        private locationService: LocationService
    ) {
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.notificationReceived = new EventEmitter<string>();
        this.timeReceived = new EventEmitter<string>();
        this.connectionExists = false;
        // create hub connection  
        this.connection = $.hubConnection("http://localhost:54042/");
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);
        // register on server events  
        this.registerOnServerEvents();

        this.proxy.on('hello', (data: string) => {
            console.log(data);
        })

        this.registerForTimerEvents();
        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection();

         this.proxy.on('checkAccomodations', (data: any) => {
            console.log(data);
        })

    }
    // method to hit from client  
    public sendHello() {
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('Hello');

    }
    // check in the browser console for either signalr connected or not  
    private startConnection(): void {
        let param = { "username": "admin" };
        $.connection.hub.qs = param;
        this.connection.start().done((data: any) => {
            this.subscribe();
            this.proxy.invoke('Completed');
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }
    private registerOnServerEvents(): void {

        this.proxy.on('clickNotification', (data: string) => {
            console.log('received notification: ' + data);
            this.notificationReceived.emit(data);
        });
    }

    private registerForTimerEvents() {

        this.proxy.on('setRealTime', (data: string) => {
            console.log('received time: ' + data);
            this.timeReceived.emit(data);
        });
    }

    private subscribe() {

        let username = localStorage.getItem("username");
        let role = localStorage.getItem("role");

        this.proxy.invoke('Subscribe', username, role);
    }

}  