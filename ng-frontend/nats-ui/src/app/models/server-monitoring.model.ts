export interface ServerStats {
    serverMonitoring: ServerMonitoring;
    error: string
    status: 'pending' | 'loading' | 'error' | 'success';
}

export interface ServerMonitoring {
    id:             number;
    name:           string;
    host:           string;
    port:           number;
    monitoringport: number;
    varz:           Varz;
    subz:           null;
}

export interface Varz {
    server_id:         string;
    server_name:       string;
    version:           string;
    proto:             number;
    git_commit:        string;
    go:                string;
    host:              string;
    port:              number;
    max_connections:   number;
    ping_interval:     number;
    ping_max:          number;
    http_host:         string;
    http_port:         number;
    http_base_path:    string;
    https_port:        number;
    auth_timeout:      number;
    max_control_line:  number;
    max_payload:       number;
    max_pending:       number;
    cluster:           Cluster;
    gateway:           Cluster;
    leaf:              Cluster;
    mqtt:              Cluster;
    websocket:         Cluster;
    jetstream:         Jetstream;
    tls_timeout:       number;
    write_deadline:    number;
    start:             Date;
    now:               Date;
    uptime:            string;
    mem:               number;
    cores:             number;
    gomaxprocs:        number;
    cpu:               number;
    connections:       number;
    total_connections: number;
    routes:            number;
    remotes:           number;
    leafnodes:         number;
    in_msgs:           number;
    out_msgs:          number;
    in_bytes:          number;
    out_bytes:         number;
    slow_consumers:    number;
    subscriptions:     number;
    http_req_stats:    HTTPReqStats;
    config_load_time:  Date;
    system_account:    string;
}

export interface Cluster {
}

export interface HTTPReqStats {
    "/":     number;
    "/varz": number;
}

export interface Jetstream {
    config: Config;
    stats:  Stats;
}

export interface Config {
    max_memory:  number;
    max_storage: number;
    store_dir:   string;
}

export interface Stats {
    memory:           number;
    storage:          number;
    reserved_memory:  number;
    reserved_storage: number;
    accounts:         number;
    ha_assets:        number;
    api:              API;
}

export interface API {
    total:  number;
    errors: number;
}
