export interface Server {
    name: string;
    hostname?: string;
    port?: number;
    monitoringPort?: number;
    connections?: number;
    messagesIn?: number;
    messagesOut?: number;
    bytesIn?: number;
    bytesOut?: number;
    status?: string ;
}
