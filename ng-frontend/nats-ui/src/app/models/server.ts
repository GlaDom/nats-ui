export interface Server {
    name?: string;
    host?: string;
    port?: number;
    monitoringPort?: number;
    connections?: number;
    messagesIn?: number;
    messagesOut?: number;
    bytesIn?: number;
    bytesOut?: number;
    status?: string;
    operations?: any;
}
