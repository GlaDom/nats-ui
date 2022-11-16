package app

import "time"

type NatsServer struct {
	ID             int64
	Name           string
	Host           string
	Port           uint64
	MonitoringPort uint64
	Varz           *Varz
	Subz           *Subz
}

type Client struct {
	ID       int64
	Name     string
	ServerID int64
	Subjects []*SubjectTreeNode
	Info     bool
	Ping     bool
	Pong     bool
	Ok       bool
	Err      bool
	Publ     bool
	Sub      bool
	Unsub    bool
	Connect  bool
	Msg      bool
}

type SubjectTreeNode struct {
	ID         string
	SubjectStr string
	Subjects   []*SubjectTreeNode
	selected   bool
}

type Jetstream struct {
	ServerID string    `json:"server_id"`
	Now      time.Time `json:"now"`
	Config   struct {
		MaxMemory  int64  `json:"max_memory"`
		MaxStorage int64  `json:"max_storage"`
		StoreDir   string `json:"store_dir"`
	} `json:"config"`
	Memory          int `json:"memory"`
	Storage         int `json:"storage"`
	ReservedMemory  int `json:"reserved_memory"`
	ReservedStorage int `json:"reserved_storage"`
	Accounts        int `json:"accounts"`
	HaAssets        int `json:"ha_assets"`
	API             struct {
		Total  int `json:"total"`
		Errors int `json:"errors"`
	} `json:"api"`
	Streams   int `json:"streams"`
	Consumers int `json:"consumers"`
	Messages  int `json:"messages"`
	Bytes     int `json:"bytes"`
}

type Varz struct {
	ServerID       string `json:"server_id"`
	ServerName     string `json:"server_name"`
	Version        string `json:"version"`
	Proto          int    `json:"proto"`
	GitCommit      string `json:"git_commit"`
	Go             string `json:"go"`
	Host           string `json:"host"`
	Port           int    `json:"port"`
	MaxConnections int    `json:"max_connections"`
	PingInterval   int64  `json:"ping_interval"`
	PingMax        int    `json:"ping_max"`
	HTTPHost       string `json:"http_host"`
	HTTPPort       int    `json:"http_port"`
	HTTPBasePath   string `json:"http_base_path"`
	HTTPSPort      int    `json:"https_port"`
	AuthTimeout    int    `json:"auth_timeout"`
	MaxControlLine int    `json:"max_control_line"`
	MaxPayload     int    `json:"max_payload"`
	MaxPending     int    `json:"max_pending"`
	Cluster        struct {
	} `json:"cluster"`
	Gateway struct {
	} `json:"gateway"`
	Leaf struct {
	} `json:"leaf"`
	Mqtt struct {
	} `json:"mqtt"`
	Websocket struct {
	} `json:"websocket"`
	Jetstream struct {
		Config struct {
			MaxMemory  int64  `json:"max_memory"`
			MaxStorage int64  `json:"max_storage"`
			StoreDir   string `json:"store_dir"`
		} `json:"config"`
		Stats struct {
			Memory          int `json:"memory"`
			Storage         int `json:"storage"`
			ReservedMemory  int `json:"reserved_memory"`
			ReservedStorage int `json:"reserved_storage"`
			Accounts        int `json:"accounts"`
			HaAssets        int `json:"ha_assets"`
			API             struct {
				Total  int `json:"total"`
				Errors int `json:"errors"`
			} `json:"api"`
		} `json:"stats"`
	} `json:"jetstream"`
	TLSTimeout       int       `json:"tls_timeout"`
	WriteDeadline    int64     `json:"write_deadline"`
	Start            time.Time `json:"start"`
	Now              time.Time `json:"now"`
	Uptime           string    `json:"uptime"`
	Mem              int       `json:"mem"`
	Cores            int       `json:"cores"`
	Gomaxprocs       int       `json:"gomaxprocs"`
	CPU              int       `json:"cpu"`
	Connections      int       `json:"connections"`
	TotalConnections int       `json:"total_connections"`
	Routes           int       `json:"routes"`
	Remotes          int       `json:"remotes"`
	Leafnodes        int       `json:"leafnodes"`
	InMsgs           int       `json:"in_msgs"`
	OutMsgs          int       `json:"out_msgs"`
	InBytes          int       `json:"in_bytes"`
	OutBytes         int       `json:"out_bytes"`
	SlowConsumers    int       `json:"slow_consumers"`
	Subscriptions    int       `json:"subscriptions"`
	HTTPReqStats     struct {
		NAMING_FAILED int `json:"/"`
		Jsz           int `json:"/jsz"`
		Varz          int `json:"/varz"`
	} `json:"http_req_stats"`
	ConfigLoadTime time.Time `json:"config_load_time"`
	SystemAccount  string    `json:"system_account"`
}

type Connz struct {
	ServerID       string        `json:"server_id"`
	Now            time.Time     `json:"now"`
	NumConnections int           `json:"num_connections"`
	Total          int           `json:"total"`
	Offset         int           `json:"offset"`
	Limit          int           `json:"limit"`
	Connections    []interface{} `json:"connections"`
}

type Accounts struct {
	ServerID      string    `json:"server_id"`
	Now           time.Time `json:"now"`
	SystemAccount string    `json:"system_account"`
	Accounts      []string  `json:"accounts"`
}

type Subz struct {
	NumSubscriptions int     `json:"num_subscriptions"`
	NumCache         int     `json:"num_cache"`
	NumInserts       int     `json:"num_inserts"`
	NumRemoves       int     `json:"num_removes"`
	NumMatches       int     `json:"num_matches"`
	CacheHitRate     int     `json:"cache_hit_rate"`
	MaxFanout        int     `json:"max_fanout"`
	AvgFanout        float64 `json:"avg_fanout"`
}

type Leafz struct {
	ServerID  string      `json:"server_id"`
	Now       time.Time   `json:"now"`
	Leafnodes int         `json:"leafnodes"`
	Leafs     interface{} `json:"leafs"`
}

type Uri struct {
	Index uint64 `json:"index" uri:"index"`
}
