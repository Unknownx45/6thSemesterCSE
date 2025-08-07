// Ad hoc & Network Sensors Study Guide JavaScript - Fixed Navigation & Full Functionality

class AdHocNetworkSensorsApp {
    constructor() {
        this.currentView = 'home';
        this.currentUnit = null;
        this.progress = this.loadProgress();
        this.bookmarks = this.loadBookmarks();
        this.flashcards = [];
        this.currentFlashcard = 0;
        this.quizQuestions = [];
        this.currentQuestion = 0;
        this.quizScore = 0;
        
        this.initializeData();
        this.bindEvents();
        this.updateProgress();
    }

    loadProgress() {
        try {
            return JSON.parse(localStorage.getItem('adhoc_progress') || '{}');
        } catch {
            return {};
        }
    }

    loadBookmarks() {
        try {
            return JSON.parse(localStorage.getItem('adhoc_bookmarks') || '[]');
        } catch {
            return [];
        }
    }

    initializeData() {
        // Enhanced course data with comprehensive questions per unit following U1.docx format
        this.courseData = {
            units: [
                {
                    id: 1,
                    title: "Introduction to Ad Hoc and Sensor Networks",
                    hours: 7,
                    questions: [
                        {
                            q: "What are Ad Hoc Networks? Explain characteristics and applications.",
                            a: "Ad Hoc Networks are wireless networks that operate without fixed infrastructure or centralized control, where nodes communicate directly and form temporary network topologies.",
                            definition: "Self-organizing wireless networks without infrastructure support",
                            keyPoints: [
                                "No fixed infrastructure required",
                                "Nodes act as both hosts and routers",
                                "Dynamic topology changes",
                                "Distributed network control",
                                "Limited energy and bandwidth"
                            ],
                            examples: ["Military Communication", "Disaster Recovery", "Vehicular Networks", "Emergency Services"]
                        },
                        {
                            q: "What are Wireless Sensor Networks (WSN)? Explain characteristics and applications.",
                            a: "WSN consists of spatially distributed autonomous sensors that cooperatively monitor physical or environmental conditions and communicate data through wireless links.",
                            definition: "Networks of autonomous sensors monitoring environmental conditions",
                            keyPoints: [
                                "Large number of sensor nodes",
                                "Energy-constrained operation",
                                "Data-centric communication",
                                "Self-organizing capabilities",
                                "Multi-hop communication"
                            ],
                            examples: ["Environmental Monitoring", "Smart Agriculture", "Healthcare Systems", "Industrial Automation"]
                        },
                        {
                            q: "Compare Ad Hoc Networks vs Traditional Networks (detailed comparison).",
                            a: "Ad Hoc networks are decentralized and infrastructure-less, while traditional networks rely on fixed infrastructure like routers and access points for connectivity.",
                            definition: "Fundamental differences between infrastructure-based and infrastructure-less networks",
                            keyPoints: [
                                "Infrastructure: Ad hoc (none) vs Traditional (fixed)",
                                "Topology: Dynamic vs Static",
                                "Control: Distributed vs Centralized",
                                "Mobility: High vs Limited",
                                "Setup: Self-organizing vs Pre-planned"
                            ],
                            examples: ["Mobile Scenarios", "Fixed Office Networks", "Emergency Communications", "Internet Infrastructure"]
                        },
                        {
                            q: "Explain design challenges in ad hoc networks.",
                            a: "Key challenges include dynamic topology, limited energy, bandwidth constraints, security vulnerabilities, and routing complexity in mobile environments.",
                            definition: "Technical and operational challenges in designing ad hoc networks",
                            keyPoints: [
                                "Dynamic topology management",
                                "Energy efficiency requirements",
                                "Bandwidth optimization",
                                "Security implementation",
                                "Quality of Service provision"
                            ],
                            examples: ["Node Mobility", "Battery Limitations", "Interference Issues", "Route Maintenance"]
                        },
                        {
                            q: "What are design issues in WSN? Energy, scalability, fault tolerance.",
                            a: "WSN design addresses energy conservation (primary constraint), network scalability (thousands of nodes), and fault tolerance (node failures) for reliable operation.",
                            definition: "Critical design considerations for wireless sensor networks",
                            keyPoints: [
                                "Energy conservation strategies",
                                "Scalable architecture design",
                                "Fault detection and recovery",
                                "Data aggregation techniques",
                                "Network lifetime optimization"
                            ],
                            examples: ["Sleep Scheduling", "Hierarchical Clustering", "Redundancy Planning", "Error Recovery"]
                        },
                        {
                            q: "Explain Sensor Network Architecture - Layered vs Cross-layer design.",
                            a: "Layered architecture follows traditional OSI model with distinct layers, while cross-layer design allows interaction between layers for optimization in resource-constrained environments.",
                            definition: "Architectural approaches for organizing sensor network protocols",
                            keyPoints: [
                                "Layered: Traditional protocol stack approach",
                                "Cross-layer: Integrated optimization approach",
                                "Performance vs Complexity tradeoffs",
                                "Resource utilization efficiency",
                                "Implementation considerations"
                            ],
                            examples: ["OSI Stack", "Integrated Protocols", "Energy-Aware Routing", "QoS Management"]
                        },
                        {
                            q: "Compare different WSN topologies - Star, Tree, Mesh.",
                            a: "Star topology uses central coordinator, Tree creates hierarchical structure, and Mesh provides multiple paths with highest reliability but complexity.",
                            definition: "Different network organization patterns for sensor networks",
                            keyPoints: [
                                "Star: Simple, single point of failure",
                                "Tree: Hierarchical, scalable structure",
                                "Mesh: Redundant paths, fault tolerant",
                                "Hybrid: Combination of topologies",
                                "Application-specific selection"
                            ],
                            examples: ["Home Automation", "Forest Monitoring", "Industrial Networks", "Smart City Infrastructure"]
                        },
                        {
                            q: "What are WSN applications in different domains?",
                            a: "WSN applications span environmental monitoring, healthcare, military surveillance, industrial automation, smart cities, and agricultural management with domain-specific requirements.",
                            definition: "Real-world applications utilizing wireless sensor network technology",
                            keyPoints: [
                                "Environmental: Weather, pollution monitoring",
                                "Healthcare: Patient monitoring, drug tracking",
                                "Military: Surveillance, battlefield awareness",
                                "Industrial: Process control, safety monitoring",
                                "Smart cities: Traffic, infrastructure management"
                            ],
                            examples: ["Weather Stations", "Body Area Networks", "Border Security", "Factory Automation"]
                        },
                        {
                            q: "Explain sensor node components and capabilities.",
                            a: "Sensor nodes comprise sensing unit (sensors, ADC), processing unit (microcontroller, memory), communication unit (transceiver), and power unit (battery, energy harvesting).",
                            definition: "Hardware and software components of individual sensor nodes",
                            keyPoints: [
                                "Sensing: Physical parameter measurement",
                                "Processing: Data computation and storage",
                                "Communication: Wireless data transmission",
                                "Power: Energy management and supply",
                                "Size and cost constraints"
                            ],
                            examples: ["Temperature Sensors", "Microcontrollers", "Radio Transceivers", "Solar Cells"]
                        },
                        {
                            q: "What are the key differences between WSN and traditional networks?",
                            a: "WSN differs in energy constraints, large scale deployment, data-centric operation, application-specific design, and autonomous operation compared to traditional networks.",
                            definition: "Distinguishing characteristics separating WSN from conventional networks",
                            keyPoints: [
                                "Energy: Severe constraints vs Abundant power",
                                "Scale: Thousands of nodes vs Limited nodes",
                                "Communication: Data-centric vs Address-centric",
                                "Operation: Autonomous vs Managed",
                                "Purpose: Sensing vs General communication"
                            ],
                            examples: ["Battery-powered vs Mains power", "Sensor data vs User traffic", "Unattended vs Managed", "Application-specific vs General purpose"]
                        }
                    ]
                },
                {
                    id: 2,
                    title: "MAC Protocols for Ad Hoc and Sensor Networks",
                    hours: 7,
                    questions: [
                        {
                            q: "What are MAC Protocol fundamentals? Explain Medium Access Control.",
                            a: "MAC protocols coordinate access to shared wireless medium among multiple nodes, preventing collisions and ensuring fair channel utilization in distributed environments.",
                            definition: "Protocols managing shared medium access in wireless networks",
                            keyPoints: [
                                "Medium sharing coordination",
                                "Collision avoidance mechanisms",
                                "Fair channel access",
                                "Energy efficiency considerations",
                                "QoS support requirements"
                            ],
                            examples: ["CSMA/CA", "TDMA", "Token Passing", "Reservation Systems"]
                        },
                        {
                            q: "Compare Contention-based vs Scheduling-based MAC protocols.",
                            a: "Contention-based protocols compete for channel access (CSMA), while scheduling-based protocols allocate predetermined time slots (TDMA) for collision-free transmission.",
                            definition: "Two fundamental approaches to medium access control",
                            keyPoints: [
                                "Contention: Random access, variable delay",
                                "Scheduling: Predetermined access, guaranteed delay",
                                "Scalability: Contention better for dynamic networks",
                                "Efficiency: Scheduling better for high loads",
                                "Complexity: Contention simpler implementation"
                            ],
                            examples: ["WiFi (Contention)", "Bluetooth (Scheduling)", "Zigbee (Hybrid)", "WirelessHART (Scheduled)"]
                        },
                        {
                            q: "Explain ALOHA protocol variants - Pure ALOHA vs Slotted ALOHA.",
                            a: "Pure ALOHA allows transmission anytime with collision probability high, while Slotted ALOHA synchronizes transmissions to time slots, doubling throughput efficiency.",
                            definition: "Early random access protocols for shared medium",
                            keyPoints: [
                                "Pure ALOHA: 18.4% maximum throughput",
                                "Slotted ALOHA: 36.8% maximum throughput",
                                "Collision handling through acknowledgments",
                                "Exponential backoff for retransmissions",
                                "Foundation for modern MAC protocols"
                            ],
                            examples: ["Satellite Networks", "Radio Packet Networks", "Early Ethernet", "IoT Applications"]
                        },
                        {
                            q: "What is CSMA protocol? Compare CSMA variants.",
                            a: "CSMA (Carrier Sense Multiple Access) listens before transmitting. CSMA/CD detects collisions during transmission, CSMA/CA avoids collisions through coordination.",
                            definition: "Listen-before-talk protocols for medium access control",
                            keyPoints: [
                                "Carrier sensing reduces collisions",
                                "CSMA/CD: Collision detection (wired)",
                                "CSMA/CA: Collision avoidance (wireless)",
                                "Hidden terminal problem in wireless",
                                "Exponential backoff algorithms"
                            ],
                            examples: ["Ethernet (CD)", "WiFi (CA)", "Zigbee (CA)", "Bluetooth (frequency hopping)"]
                        },
                        {
                            q: "Explain MACA protocol and collision avoidance mechanism.",
                            a: "MACA (Multiple Access with Collision Avoidance) uses RTS/CTS handshake to reserve channel and solve hidden terminal problem in wireless networks.",
                            definition: "Collision avoidance protocol using control packet exchange",
                            keyPoints: [
                                "RTS/CTS handshake mechanism",
                                "Hidden terminal problem solution",
                                "Virtual carrier sensing",
                                "Network Allocation Vector (NAV)",
                                "Exposed terminal problem remains"
                            ],
                            examples: ["RTS Request", "CTS Grant", "Data Transmission", "ACK Confirmation"]
                        },
                        {
                            q: "Compare MACA vs MACAW protocols (detailed comparison).",
                            a: "MACAW enhances MACA by adding acknowledgments, exponential backoff, and better fairness through per-packet backoff and congestion control mechanisms.",
                            definition: "Evolution from MACA to MACAW with improved features",
                            keyPoints: [
                                "MACA: Basic RTS/CTS, no ACK",
                                "MACAW: Adds ACK, backoff improvements",
                                "Fairness: MACAW provides better fairness",
                                "Congestion: MACAW includes congestion control",
                                "Complexity: MACAW more complex implementation"
                            ],
                            examples: ["Basic Collision Avoidance", "Enhanced Reliability", "Fair Channel Access", "Congestion Management"]
                        },
                        {
                            q: "What are Energy-efficient MAC protocols for WSN? S-MAC, T-MAC, B-MAC.",
                            a: "S-MAC uses periodic sleep, T-MAC adapts duty cycle to traffic, B-MAC employs low power listening with preamble sampling for energy conservation.",
                            definition: "MAC protocols optimized for energy-constrained sensor networks",
                            keyPoints: [
                                "S-MAC: Synchronized sleep schedules",
                                "T-MAC: Traffic-adaptive duty cycling",
                                "B-MAC: Berkeley MAC with LPL",
                                "Energy vs Latency tradeoffs",
                                "Application-specific selection"
                            ],
                            examples: ["Environmental Monitoring", "Asset Tracking", "Smart Buildings", "Agricultural Sensing"]
                        },
                        {
                            q: "Explain X-MAC and duty cycling MAC protocols.",
                            a: "X-MAC uses strobed preamble transmission allowing receivers to interrupt and respond quickly, reducing energy consumption compared to traditional long preambles.",
                            definition: "Advanced energy-efficient MAC with improved wake-up mechanisms",
                            keyPoints: [
                                "Strobed preamble technique",
                                "Early termination capability",
                                "Reduced energy consumption",
                                "Lower latency than LPL",
                                "Scalable to network density"
                            ],
                            examples: ["Sensor Networks", "IoT Devices", "Battery-powered Systems", "Long-term Deployments"]
                        },
                        {
                            q: "What are Hidden and Exposed Terminal problems? Solutions.",
                            a: "Hidden terminals cannot hear each other causing collisions at receiver. Exposed terminals avoid transmission unnecessarily. RTS/CTS solves hidden, spatial reuse helps exposed.",
                            definition: "Fundamental problems in wireless MAC protocol design",
                            keyPoints: [
                                "Hidden: Nodes outside sensing range",
                                "Exposed: Nodes avoiding unnecessary deferrals",
                                "RTS/CTS: Solution for hidden terminals",
                                "Spatial reuse: Approach for exposed terminals",
                                "Perfect solution remains elusive"
                            ],
                            examples: ["Wireless Networks", "Ad Hoc Scenarios", "Sensor Networks", "Mobile Communications"]
                        },
                        {
                            q: "Compare different WSN MAC protocols performance.",
                            a: "Performance comparison involves energy efficiency, throughput, latency, and scalability metrics. S-MAC offers good energy savings, T-MAC adapts to traffic, B-MAC provides flexibility.",
                            definition: "Evaluation metrics and performance characteristics of WSN MAC protocols",
                            keyPoints: [
                                "Energy efficiency: Primary metric",
                                "Throughput: Data delivery capacity",
                                "Latency: End-to-end delay",
                                "Scalability: Network size handling",
                                "Application requirements drive selection"
                            ],
                            examples: ["Energy Consumption Graphs", "Throughput Analysis", "Latency Measurements", "Scalability Studies"]
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Routing Protocols in Ad Hoc and Sensor Networks",
                    hours: 7,
                    questions: [
                        {
                            q: "What are routing challenges in ad hoc networks?",
                            a: "Key challenges include dynamic topology, limited bandwidth, energy constraints, security vulnerabilities, and scalability issues in mobile wireless environments.",
                            definition: "Fundamental difficulties in routing for ad hoc networks",
                            keyPoints: [
                                "Dynamic topology changes",
                                "Limited network resources",
                                "Energy conservation needs",
                                "Security threat management",
                                "Scalability requirements"
                            ],
                            examples: ["Node Mobility", "Link Failures", "Battery Depletion", "Network Partitions"]
                        },
                        {
                            q: "Compare Proactive vs Reactive routing protocols (detailed comparison).",
                            a: "Proactive protocols maintain routes continuously (OLSR, DSDV), while reactive protocols discover routes on-demand (AODV, DSR). Proactive suits stable networks, reactive fits dynamic scenarios.",
                            definition: "Two fundamental approaches to routing in ad hoc networks",
                            keyPoints: [
                                "Proactive: Continuous route maintenance",
                                "Reactive: On-demand route discovery",
                                "Control overhead: Proactive higher, constant",
                                "Route latency: Reactive higher initial delay",
                                "Network stability determines choice"
                            ],
                            examples: ["OLSR vs AODV", "Table-driven vs Source-initiated", "Periodic updates vs Flooding", "Link state vs Distance vector"]
                        },
                        {
                            q: "Explain AODV (Ad-hoc On-demand Distance Vector) protocol.",
                            a: "AODV discovers routes on-demand using RREQ flooding, RREP unicast reply, and maintains routes using sequence numbers and hello messages for loop-free routing.",
                            definition: "On-demand routing protocol using distance vector approach",
                            keyPoints: [
                                "Route discovery: RREQ/RREP mechanism",
                                "Sequence numbers prevent loops",
                                "Hello messages for neighbors",
                                "Route expiry and maintenance",
                                "Destination-only responses"
                            ],
                            examples: ["Route Request Flooding", "Route Reply Unicast", "Link Break Handling", "Route Error Messages"]
                        },
                        {
                            q: "What is DSR (Dynamic Source Routing)? Route discovery process.",
                            a: "DSR uses source routing where complete route is carried in packet header. Route discovery floods RREQ with route accumulation, RREP returns discovered route to source.",
                            definition: "Source routing protocol with complete path information",
                            keyPoints: [
                                "Complete route in packet header",
                                "Route caching at all nodes",
                                "No periodic routing messages",
                                "Route discovery and route reply",
                                "Multiple route utilization"
                            ],
                            examples: ["Source Route Header", "Route Cache", "Route Discovery", "Route Maintenance"]
                        },
                        {
                            q: "Compare AODV vs DSR vs DSDV routing protocols.",
                            a: "AODV uses hop-by-hop routing with sequence numbers, DSR employs source routing with route caching, DSDV maintains proactive distance vector tables with periodic updates.",
                            definition: "Comparison of three major ad hoc routing protocols",
                            keyPoints: [
                                "AODV: On-demand, hop-by-hop, sequence numbers",
                                "DSR: On-demand, source routing, route caching",
                                "DSDV: Proactive, distance vector, periodic updates",
                                "Performance varies with network conditions",
                                "Energy and bandwidth considerations"
                            ],
                            examples: ["Mobile Scenarios", "Network Density", "Traffic Patterns", "Mobility Models"]
                        },
                        {
                            q: "Explain OLSR (Optimized Link State Routing) protocol.",
                            a: "OLSR uses Multi-Point Relays (MPRs) to reduce flooding overhead in link state advertisements, maintaining topology information for shortest path routing.",
                            definition: "Proactive link state routing protocol optimized for wireless networks",
                            keyPoints: [
                                "Multi-Point Relay selection",
                                "Reduced flooding overhead",
                                "Link state advertisements",
                                "Topology control messages",
                                "Shortest path computation"
                            ],
                            examples: ["MPR Selection", "TC Messages", "Hello Protocols", "Dijkstra Algorithm"]
                        },
                        {
                            q: "What is ZRP (Zone Routing Protocol)? Hybrid routing approach.",
                            a: "ZRP combines proactive routing within zones and reactive routing between zones, using radius-limited proactive discovery and bordercast resolution for inter-zone communication.",
                            definition: "Hybrid protocol combining proactive and reactive approaches",
                            keyPoints: [
                                "Intra-zone: Proactive routing",
                                "Inter-zone: Reactive routing",
                                "Zone radius configuration",
                                "Bordercast route discovery",
                                "Scalability improvements"
                            ],
                            examples: ["Zone Definition", "Peripheral Nodes", "Route Query", "Bordercast Trees"]
                        },
                        {
                            q: "Explain Hierarchical routing and Geographic routing.",
                            a: "Hierarchical routing organizes networks in levels (clusters, zones) for scalability. Geographic routing uses node positions for forwarding decisions, suitable for location-aware networks.",
                            definition: "Advanced routing paradigms for large-scale networks",
                            keyPoints: [
                                "Hierarchical: Multi-level organization",
                                "Geographic: Position-based forwarding",
                                "Scalability: Reduced routing overhead",
                                "Requirements: Clustering or GPS",
                                "Applications: Large networks, sensor networks"
                            ],
                            examples: ["Cluster Heads", "Zone Leaders", "GPS Coordinates", "Greedy Forwarding"]
                        },
                        {
                            q: "What are WSN routing protocols? LEACH, SPIN, TEEN.",
                            a: "LEACH uses rotating cluster heads for energy distribution, SPIN employs negotiation-based data dissemination, TEEN provides threshold-sensitive event reporting.",
                            definition: "Specialized routing protocols for wireless sensor networks",
                            keyPoints: [
                                "LEACH: Low-Energy Adaptive Clustering",
                                "SPIN: Sensor Protocol for Information via Negotiation",
                                "TEEN: Threshold-sensitive Energy Efficient Network",
                                "Energy efficiency focus",
                                "Data-centric operation"
                            ],
                            examples: ["Cluster Formation", "Data Negotiation", "Event Thresholds", "Energy Conservation"]
                        },
                        {
                            q: "Compare Geographic routing vs Energy-Aware routing (GEAR).",
                            a: "Geographic routing uses position information for forwarding decisions, while GEAR combines geographic information with energy considerations for routing in sensor networks.",
                            definition: "Position-based routing with and without energy considerations",
                            keyPoints: [
                                "Geographic: Position-only decisions",
                                "GEAR: Position plus energy awareness",
                                "Energy holes: GEAR addresses, geographic doesn't",
                                "Delivery guarantee: Both use planarization",
                                "Applications: Location-aware sensor networks"
                            ],
                            examples: ["GPS-based Forwarding", "Energy-weighted Costs", "Hole Circumvention", "Geographic Hashing"]
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Transport and Energy Management in WSN",
                    hours: 7,
                    questions: [
                        {
                            q: "What are Transport layer issues in WSN? TCP vs UDP.",
                            a: "WSN transport faces reliability, congestion control, and energy efficiency challenges. TCP's overhead unsuitable for sensors, UDP lacks reliability, specialized protocols needed.",
                            definition: "Transport layer challenges specific to wireless sensor networks",
                            keyPoints: [
                                "TCP: Too heavyweight for sensors",
                                "UDP: Lacks reliability mechanisms",
                                "Energy constraints limit complexity",
                                "Reliability vs efficiency tradeoffs",
                                "Application-specific requirements"
                            ],
                            examples: ["Connection Setup Overhead", "Packet Loss Recovery", "Congestion Windows", "Energy Consumption"]
                        },
                        {
                            q: "Explain Transport protocols for WSN - CODA, RMST, PSFQ, ESRT.",
                            a: "CODA detects congestion via buffer occupancy, RMST provides selective reliability, PSFQ uses pump-slowly fetch-quickly, ESRT ensures event reliability with congestion control.",
                            definition: "Specialized transport protocols designed for sensor network requirements",
                            keyPoints: [
                                "CODA: Congestion Detection and Avoidance",
                                "RMST: Reliable Multi-Segment Transport",
                                "PSFQ: Pump Slowly Fetch Quickly",
                                "ESRT: Event-to-Sink Reliable Transport",
                                "Energy-aware design principles"
                            ],
                            examples: ["Buffer Monitoring", "Selective ACKs", "Data Pumping", "Event Detection"]
                        },
                        {
                            q: "What is Energy-efficient routing in WSN? Techniques and algorithms.",
                            a: "Energy-efficient routing maximizes network lifetime through techniques like clustering, data aggregation, sleep scheduling, and load balancing across sensor nodes.",
                            definition: "Routing strategies optimized for energy conservation in sensor networks",
                            keyPoints: [
                                "Network lifetime maximization",
                                "Load balancing strategies",
                                "Data aggregation benefits",
                                "Sleep scheduling coordination",
                                "Multi-path routing options"
                            ],
                            examples: ["LEACH Clustering", "Data Fusion", "Duty Cycling", "Energy-aware Metrics"]
                        },
                        {
                            q: "Explain Data aggregation and clustering techniques for WSN.",
                            a: "Data aggregation combines multiple sensor readings to reduce transmission overhead. Clustering organizes nodes hierarchically with cluster heads performing aggregation and forwarding.",
                            definition: "Techniques for reducing communication overhead in sensor networks",
                            keyPoints: [
                                "Aggregation: Combine multiple readings",
                                "Clustering: Hierarchical organization",
                                "Cluster heads: Aggregation points",
                                "Energy savings: Reduced transmissions",
                                "Data accuracy: Aggregation functions"
                            ],
                            examples: ["Temperature Averaging", "MAX/MIN Functions", "Cluster Formation", "Head Selection"]
                        },
                        {
                            q: "What are Clustering protocols? LEACH, HEED comparison.",
                            a: "LEACH rotates cluster heads randomly for energy distribution. HEED considers residual energy and communication cost for cluster head selection, providing better energy efficiency.",
                            definition: "Protocols for organizing sensor networks into hierarchical clusters",
                            keyPoints: [
                                "LEACH: Random cluster head rotation",
                                "HEED: Energy-aware head selection",
                                "Energy distribution: Both address issue",
                                "Cluster formation: Different algorithms",
                                "Performance: HEED generally better"
                            ],
                            examples: ["Probabilistic Selection", "Energy Thresholds", "Communication Costs", "Network Lifetime"]
                        },
                        {
                            q: "Explain Energy harvesting in sensor networks.",
                            a: "Energy harvesting captures ambient energy (solar, vibration, thermal, RF) to supplement or replace batteries, enabling perpetual operation of sensor nodes.",
                            definition: "Techniques for capturing ambient energy to power sensor nodes",
                            keyPoints: [
                                "Solar: Most common and efficient",
                                "Vibration: Mechanical energy conversion",
                                "Thermal: Temperature differential utilization",
                                "RF: Radio frequency energy harvesting",
                                "Hybrid: Multiple source combinations"
                            ],
                            examples: ["Solar Panels", "Piezoelectric Generators", "Thermoelectric Modules", "RF Energy Harvesting"]
                        },
                        {
                            q: "What are Sleep-wake scheduling algorithms?",
                            a: "Sleep-wake scheduling coordinates node sleep cycles to maintain network connectivity while maximizing energy savings through synchronized or randomized sleep patterns.",
                            definition: "Algorithms coordinating node activity cycles for energy conservation",
                            keyPoints: [
                                "Connectivity preservation requirement",
                                "Energy conservation objective",
                                "Synchronized vs asynchronous approaches",
                                "Coverage maintenance",
                                "Latency vs energy tradeoffs"
                            ],
                            examples: ["S-MAC Synchronization", "Random Sleep Patterns", "Coverage-based Scheduling", "Event-driven Wake-up"]
                        },
                        {
                            q: "Compare different energy conservation strategies.",
                            a: "Strategies include duty cycling (periodic sleep), data aggregation (reduce transmissions), topology control (optimize connectivity), and transmission power control (adjust range).",
                            definition: "Various approaches for conserving energy in wireless sensor networks",
                            keyPoints: [
                                "Duty cycling: Sleep/wake patterns",
                                "Data aggregation: Transmission reduction",
                                "Topology control: Connectivity optimization",
                                "Power control: Transmission range adjustment",
                                "Protocol optimization: Layer-specific improvements"
                            ],
                            examples: ["Sleep Schedules", "In-network Processing", "Neighbor Discovery", "Adaptive Transmission"]
                        },
                        {
                            q: "Explain data aggregation techniques and their benefits.",
                            a: "Data aggregation combines sensor data using functions like SUM, AVG, MAX, MIN to reduce network traffic, save energy, and provide meaningful information to applications.",
                            definition: "Techniques for combining sensor data to reduce communication overhead",
                            keyPoints: [
                                "Aggregation functions: Statistical operations",
                                "In-network processing: Local computation",
                                "Traffic reduction: Fewer transmissions",
                                "Energy savings: Reduced communication",
                                "Data quality: Meaningful results"
                            ],
                            examples: ["Temperature Averaging", "Duplicate Elimination", "Compressed Sensing", "Data Fusion"]
                        },
                        {
                            q: "What is energy-aware topology control?",
                            a: "Energy-aware topology control adjusts network topology by controlling transmission ranges and selecting energy-efficient links to optimize network performance and lifetime.",
                            definition: "Network topology optimization considering energy consumption",
                            keyPoints: [
                                "Transmission range adjustment",
                                "Link quality consideration",
                                "Energy-efficient path selection",
                                "Network connectivity maintenance",
                                "Load balancing across nodes"
                            ],
                            examples: ["Power Level Adjustment", "Neighbor Selection", "Routing Tree Construction", "Load Distribution"]
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Localization, Synchronization, and Data Dissemination",
                    hours: 7,
                    questions: [
                        {
                            q: "What is Localization in WSN? GPS vs GPS-free techniques.",
                            a: "Localization determines sensor node positions. GPS provides accurate coordinates but requires line-of-sight and consumes power. GPS-free techniques use anchor nodes and ranging measurements.",
                            definition: "Techniques for determining geographical positions of sensor nodes",
                            keyPoints: [
                                "GPS: Satellite-based positioning",
                                "GPS-free: Relative positioning methods",
                                "Energy consumption: GPS higher",
                                "Accuracy: GPS more precise",
                                "Indoor applications: GPS-free required"
                            ],
                            examples: ["GPS Receivers", "Anchor Nodes", "Trilateration", "Relative Coordinates"]
                        },
                        {
                            q: "Explain Range-based localization - RSSI, TOA, TDOA, AOA.",
                            a: "RSSI uses signal strength, TOA measures time-of-arrival, TDOA uses time differences, AOA estimates arrival angles. Each requires different hardware and provides varying accuracy.",
                            definition: "Localization techniques using distance or angle measurements",
                            keyPoints: [
                                "RSSI: Received Signal Strength Indication",
                                "TOA: Time of Arrival measurement",
                                "TDOA: Time Difference of Arrival",
                                "AOA: Angle of Arrival estimation",
                                "Hardware requirements vary by technique"
                            ],
                            examples: ["Signal Strength Meters", "Synchronized Clocks", "Antenna Arrays", "Ultrasonic Ranging"]
                        },
                        {
                            q: "What are Range-free localization techniques? Centroid, DV-Hop, APIT.",
                            a: "Centroid uses beacon proximity, DV-Hop estimates distances using hop counts, APIT determines position relative to anchor triangles without range measurements.",
                            definition: "Localization methods not requiring precise distance measurements",
                            keyPoints: [
                                "Centroid: Simple proximity-based",
                                "DV-Hop: Distance vector approach",
                                "APIT: Area localization method",
                                "Lower accuracy than range-based",
                                "Lower hardware requirements"
                            ],
                            examples: ["Beacon Signals", "Hop Count Estimation", "Triangle Tests", "Area Determination"]
                        },
                        {
                            q: "Compare different localization algorithms (accuracy comparison).",
                            a: "GPS provides highest accuracy (meters) but requires infrastructure. TOA/TDOA offer good accuracy with synchronization. RSSI and range-free methods trade accuracy for simplicity.",
                            definition: "Evaluation of localization techniques based on accuracy and requirements",
                            keyPoints: [
                                "GPS: Highest accuracy, infrastructure needed",
                                "TOA/TDOA: Good accuracy, synchronization required",
                                "AOA: Moderate accuracy, directional antennas needed",
                                "RSSI: Variable accuracy, simple hardware",
                                "Range-free: Lower accuracy, minimal requirements"
                            ],
                            examples: ["Meter-level Accuracy", "Synchronization Overhead", "Hardware Complexity", "Environmental Factors"]
                        },
                        {
                            q: "What is Time synchronization in WSN? RBS, TPSN protocols.",
                            a: "Time synchronization coordinates clocks across nodes. RBS (Reference Broadcast Synchronization) uses broadcast references, TPSN (Timing-sync Protocol) creates spanning tree.",
                            definition: "Protocols for coordinating time across sensor network nodes",
                            keyPoints: [
                                "RBS: Reference broadcast approach",
                                "TPSN: Hierarchical synchronization tree",
                                "Clock drift: Natural timing variations",
                                "Synchronization accuracy: Application dependent",
                                "Energy overhead: Protocol-specific costs"
                            ],
                            examples: ["Broadcast Beacons", "Synchronization Trees", "Clock Adjustment", "Timestamp Exchange"]
                        },
                        {
                            q: "Explain Data dissemination techniques in WSN.",
                            a: "Data dissemination distributes information throughout network using flooding, gossiping, or structured approaches like publish-subscribe systems for efficient information sharing.",
                            definition: "Methods for distributing data throughout sensor networks",
                            keyPoints: [
                                "Flooding: Simple but inefficient",
                                "Gossiping: Probabilistic forwarding",
                                "Structured: Organized distribution",
                                "Publish-subscribe: Event-based model",
                                "Energy efficiency considerations"
                            ],
                            examples: ["Network-wide Updates", "Event Notifications", "Configuration Changes", "Query Distribution"]
                        },
                        {
                            q: "What are Query processing techniques in sensor networks?",
                            a: "Query processing handles user requests for sensor data using in-network aggregation, query optimization, and distributed processing to efficiently collect and return information.",
                            definition: "Techniques for processing user queries in sensor networks",
                            keyPoints: [
                                "In-network processing: Local computation",
                                "Query optimization: Efficient execution",
                                "Distributed processing: Parallel execution",
                                "Energy efficiency: Primary concern",
                                "Result accuracy: Quality assurance"
                            ],
                            examples: ["SQL-like Queries", "Aggregation Queries", "Spatial Queries", "Temporal Queries"]
                        },
                        {
                            q: "Explain Mobile sink based data collection.",
                            a: "Mobile sink moves through network to collect data, reducing multi-hop communication costs and balancing energy consumption by varying data collection points.",
                            definition: "Data collection strategy using mobile data gathering points",
                            keyPoints: [
                                "Mobility patterns: Planned or random",
                                "Energy balancing: Distributed load",
                                "Latency implications: Collection delays",
                                "Buffer management: Temporary storage",
                                "Path optimization: Efficient routes"
                            ],
                            examples: ["Mobile Robots", "UAV Collection", "Vehicle-based Sinks", "Animal-mounted Collectors"]
                        },
                        {
                            q: "What is Data storage and retrieval in WSN?",
                            a: "Data storage manages sensor information through distributed storage, data-centric storage, or external storage systems with retrieval mechanisms for accessing stored data.",
                            definition: "Systems for storing and accessing sensor data",
                            keyPoints: [
                                "Local storage: Individual node storage",
                                "Distributed storage: Network-wide storage",
                                "Data-centric: Location-independent storage",
                                "External storage: Sink-based storage",
                                "Retrieval mechanisms: Query-based access"
                            ],
                            examples: ["Flash Memory", "Distributed Hash Tables", "Geographic Hash Tables", "Database Systems"]
                        },
                        {
                            q: "Compare synchronization protocols for different applications.",
                            a: "Applications require different synchronization accuracy: microseconds for acoustic arrays, milliseconds for data fusion, seconds for sleep coordination. Protocol selection depends on requirements.",
                            definition: "Application-specific requirements for time synchronization accuracy",
                            keyPoints: [
                                "Acoustic applications: Microsecond accuracy",
                                "Data fusion: Millisecond accuracy",
                                "Sleep coordination: Second accuracy",
                                "Energy overhead: Accuracy vs efficiency",
                                "Application tolerance: Error acceptance"
                            ],
                            examples: ["Acoustic Localization", "Environmental Monitoring", "Event Detection", "Network Coordination"]
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Security and Emerging Trends",
                    hours: 7,
                    questions: [
                        {
                            q: "What are Security issues in ad hoc networks? Attack models.",
                            a: "Ad hoc networks face attacks like eavesdropping, impersonation, denial of service, and routing attacks due to wireless medium, lack of infrastructure, and dynamic topology.",
                            definition: "Security challenges and threat models in ad hoc networks",
                            keyPoints: [
                                "Wireless vulnerabilities: Eavesdropping, jamming",
                                "Infrastructure absence: No trusted entities",
                                "Dynamic topology: Changing trust relationships",
                                "Resource constraints: Limited security mechanisms",
                                "Collaborative nature: Insider attacks possible"
                            ],
                            examples: ["Packet Interception", "Node Impersonation", "Routing Disruption", "Energy Depletion Attacks"]
                        },
                        {
                            q: "Explain different security attacks - Sybil, Blackhole, Wormhole.",
                            a: "Sybil attack uses multiple fake identities, Blackhole drops all packets claiming shortest routes, Wormhole creates illusion of short paths using out-of-band channels.",
                            definition: "Specific attack types targeting ad hoc and sensor networks",
                            keyPoints: [
                                "Sybil: Multiple identity masquerading",
                                "Blackhole: Traffic absorption attack",
                                "Wormhole: Topology manipulation attack",
                                "Detection challenges: Distributed environment",
                                "Defense mechanisms: Protocol modifications needed"
                            ],
                            examples: ["Identity Verification", "Route Validation", "Packet Monitoring", "Secure Routing"]
                        },
                        {
                            q: "What is Intrusion detection in WSN? Techniques and approaches.",
                            a: "WSN intrusion detection monitors network behavior for anomalies using distributed detection, anomaly-based detection, and collaborative approaches considering energy constraints.",
                            definition: "Security monitoring systems for wireless sensor networks",
                            keyPoints: [
                                "Distributed detection: Multiple monitoring points",
                                "Anomaly detection: Behavior deviation analysis",
                                "Collaborative approach: Information sharing",
                                "Energy constraints: Lightweight mechanisms",
                                "Real-time monitoring: Immediate response"
                            ],
                            examples: ["Traffic Pattern Analysis", "Node Behavior Monitoring", "Energy Consumption Tracking", "Communication Pattern Detection"]
                        },
                        {
                            q: "Explain Secure routing protocols for ad hoc networks.",
                            a: "Secure routing protocols like SAODV, ARIADNE, and SEAD add authentication, integrity, and confidentiality to prevent routing attacks while maintaining efficiency.",
                            definition: "Routing protocols enhanced with security mechanisms",
                            keyPoints: [
                                "Authentication: Verify message sources",
                                "Integrity: Prevent message modification",
                                "Confidentiality: Protect routing information",
                                "Non-repudiation: Prevent denial of actions",
                                "Performance impact: Security vs efficiency"
                            ],
                            examples: ["SAODV Protocol", "ARIADNE Protocol", "SEAD Protocol", "Digital Signatures"]
                        },
                        {
                            q: "What are Privacy-preserving techniques in WSN?",
                            a: "Privacy preservation in WSN uses data anonymization, location privacy, communication privacy, and context privacy to protect sensitive information while maintaining functionality.",
                            definition: "Techniques protecting user and data privacy in sensor networks",
                            keyPoints: [
                                "Data anonymization: Remove identifying information",
                                "Location privacy: Hide node positions",
                                "Communication privacy: Protect message content",
                                "Context privacy: Hide application context",
                                "Utility preservation: Maintain data usefulness"
                            ],
                            examples: ["k-anonymity", "Location Obfuscation", "Traffic Analysis Prevention", "Data Perturbation"]
                        },
                        {
                            q: "Compare different security threats and countermeasures.",
                            a: "Security threats range from passive eavesdropping to active attacks. Countermeasures include cryptography, authentication, intrusion detection, and secure protocols with varying overhead.",
                            definition: "Comprehensive analysis of threats and corresponding defense mechanisms",
                            keyPoints: [
                                "Passive threats: Eavesdropping, traffic analysis",
                                "Active threats: Impersonation, modification, denial",
                                "Cryptographic defenses: Encryption, authentication",
                                "Protocol defenses: Secure routing, key management",
                                "System defenses: Intrusion detection, monitoring"
                            ],
                            examples: ["Encryption Algorithms", "Authentication Protocols", "Secure Key Exchange", "Anomaly Detection"]
                        },
                        {
                            q: "What are Mobile ad hoc networks (MANETs)? Applications.",
                            a: "MANETs are mobile wireless networks without infrastructure, supporting applications like emergency communications, military operations, vehicular networks, and personal area networks.",
                            definition: "Infrastructure-less networks with mobile nodes",
                            keyPoints: [
                                "High mobility: Frequent topology changes",
                                "Infrastructure-less: Self-organizing",
                                "Multi-hop: Cooperative communication",
                                "Applications: Emergency, military, civilian",
                                "Challenges: Routing, security, QoS"
                            ],
                            examples: ["Emergency Response", "Military Communications", "Conference Networks", "Vehicle Networks"]
                        },
                        {
                            q: "Explain Vehicular ad hoc networks (VANETs) characteristics.",
                            a: "VANETs connect vehicles for safety and traffic applications using high-speed mobility, predictable movement patterns, intermittent connectivity, and specialized communication requirements.",
                            definition: "Ad hoc networks specifically designed for vehicular communications",
                            keyPoints: [
                                "High mobility: Highway speeds",
                                "Predictable patterns: Road constraints",
                                "Safety applications: Collision avoidance",
                                "Traffic applications: Route optimization",
                                "Standards: DSRC, 802.11p protocols"
                            ],
                            examples: ["Collision Warning", "Traffic Information", "Emergency Services", "Infotainment"]
                        },
                        {
                            q: "What are Cognitive radio sensor networks (CRSN)?",
                            a: "CRSN combines cognitive radio capabilities with sensor networks, enabling dynamic spectrum access, interference avoidance, and adaptive communication for improved spectrum utilization.",
                            definition: "Sensor networks with cognitive radio capabilities for spectrum awareness",
                            keyPoints: [
                                "Spectrum awareness: Monitor spectrum usage",
                                "Dynamic access: Opportunistic spectrum use",
                                "Interference avoidance: Adaptive frequency selection",
                                "Energy efficiency: Optimized transmission",
                                "Regulatory compliance: Licensed user protection"
                            ],
                            examples: ["Spectrum Sensing", "Dynamic Spectrum Access", "Interference Mitigation", "Adaptive Protocols"]
                        },
                        {
                            q: "What are AI/ML applications in WSN? Future trends.",
                            a: "AI/ML enhances WSN through intelligent data processing, predictive analytics, adaptive protocols, anomaly detection, and autonomous network management for improved performance and efficiency.",
                            definition: "Artificial intelligence and machine learning applications in sensor networks",
                            keyPoints: [
                                "Data processing: Intelligent analytics",
                                "Predictive models: Future state estimation",
                                "Adaptive protocols: Self-optimizing networks",
                                "Anomaly detection: Automated monitoring",
                                "Network management: Autonomous operation"
                            ],
                            examples: ["Machine Learning Algorithms", "Neural Networks", "Edge Computing", "Autonomous Systems"]
                        }
                    ]
                }
            ]
        };

        this.generateFlashcardsFromUnits();
        this.generateQuizQuestionsFromUnits();
    }

    generateFlashcardsFromUnits() {
        this.flashcards = [];
        this.courseData.units.forEach(unit => {
            unit.questions.forEach(item => {
                this.flashcards.push({
                    unit: unit.id,
                    front: item.q,
                    back: item.a,
                    category: this.getCategoryFromUnit(unit.id)
                });
            });
        });
    }

    generateQuizQuestionsFromUnits() {
        this.quizQuestions = [];
        this.courseData.units.forEach(unit => {
            unit.questions.forEach((item, index) => {
                const options = this.generateQuizOptions(item.q, item.a, unit.id);
                this.quizQuestions.push({
                    question: item.q,
                    options: options.options,
                    correct: options.correctIndex,
                    unit: unit.id,
                    explanation: item.a
                });
            });
        });
    }

    generateQuizOptions(question, correctAnswer, unitId) {
        const distractors = this.getDistractorsForQuestion(question, unitId);
        const shortAnswer = this.createShortAnswer(correctAnswer);
        const options = [shortAnswer, ...distractors.slice(0, 3)];
        const shuffled = this.shuffleArray([...options]);
        const correctIndex = shuffled.indexOf(shortAnswer);
        
        return {
            options: shuffled,
            correctIndex: correctIndex
        };
    }

    createShortAnswer(fullAnswer) {
        if (fullAnswer.includes('.')) {
            return fullAnswer.split('.')[0] + '.';
        }
        return fullAnswer.substring(0, 100) + (fullAnswer.length > 100 ? '...' : '');
    }

    getDistractorsForQuestion(question, unitId) {
        const distractorSets = {
            1: ["Only supports infrastructure networks", "Requires centralized control", "Cannot handle mobile nodes", "Works only with fixed topology"],
            2: ["Uses only time division access", "Requires synchronized clocks always", "Cannot handle collisions", "Works only with infrastructure"],
            3: ["Maintains only static routes", "Uses only proactive protocols", "Cannot handle node mobility", "Requires global topology knowledge"],
            4: ["Uses only TCP connections", "Cannot aggregate data", "Requires high bandwidth", "Does not support clustering"],
            5: ["Requires GPS for all nodes", "Cannot work without synchronization", "Uses only range-based methods", "Needs external infrastructure"],
            6: ["Provides complete security", "Cannot detect attacks", "Uses only encryption", "Requires trusted infrastructure"]
        };
        
        return distractorSets[unitId] || ["Incorrect option A", "Incorrect option B", "Incorrect option C", "Incorrect option D"];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    getCategoryFromUnit(unitId) {
        const categoryMap = {
            1: 'introduction', 2: 'mac', 3: 'routing', 
            4: 'transport', 5: 'localization', 6: 'security'
        };
        return categoryMap[unitId] || 'general';
    }

    bindEvents() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.bindNavigationEvents();
        this.bindUnitEvents();
        this.bindSearchEvents();
        this.bindToolEvents();
    }

    bindNavigationEvents() {
        // Main navigation buttons - Fixed event binding
        const navButtons = document.querySelectorAll('.nav-btn:not(.dropdown-btn)');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = btn.getAttribute('data-view');
                if (view) {
                    this.showView(view);
                    this.updateNavActiveState(btn);
                }
            });
        });

        // Dropdown items - Fixed event binding
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const unit = parseInt(item.getAttribute('data-unit'));
                if (unit) {
                    this.showUnit(unit);
                }
            });
        });

        // Breadcrumb navigation - Fixed event binding
        const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view') || 'home';
                this.showView(view);
            });
        });
    }

    bindUnitEvents() {
        // Unit cards - Fixed event binding
        const unitCards = document.querySelectorAll('.unit-card');
        unitCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const unit = parseInt(card.getAttribute('data-unit'));
                if (unit) {
                    this.showUnit(unit);
                }
            });
        });

        // Unit buttons - Fixed event binding
        const unitButtons = document.querySelectorAll('.unit-btn');
        unitButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const unitCard = btn.closest('.unit-card');
                if (unitCard) {
                    const unit = parseInt(unitCard.getAttribute('data-unit'));
                    if (unit) {
                        this.showUnit(unit);
                    }
                }
            });
        });

        // Quick access buttons - Fixed event binding
        const quickButtons = document.querySelectorAll('.quick-btn');
        quickButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = btn.getAttribute('data-view');
                const tool = btn.getAttribute('data-tool');
                
                if (view === 'tools' && tool) {
                    this.showView('tools');
                    setTimeout(() => this.showTool(tool), 100);
                } else if (view) {
                    this.showView(view);
                }
            });
        });
    }

    bindSearchEvents() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (e.target.value.length >= 2) {
                    this.handleSearch(e.target.value);
                } else if (e.target.value.length === 0) {
                    this.clearSearch();
                }
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const query = searchInput ? searchInput.value : '';
                this.handleSearch(query);
            });
        }
    }

    bindToolEvents() {
        const toolEvents = [
            { id: 'startFlashcards', handler: () => this.startFlashcards() },
            { id: 'flipCard', handler: () => this.flipCard() },
            { id: 'nextCard', handler: () => this.nextCard() },
            { id: 'exitFlashcards', handler: () => this.exitFlashcards() },
            { id: 'startQuiz', handler: () => this.startQuiz() },
            { id: 'submitAnswer', handler: () => this.submitAnswer() },
            { id: 'nextQuestion', handler: () => this.nextQuestion() },
            { id: 'exitQuiz', handler: () => this.exitQuiz() },
            { id: 'showComparison', handler: () => this.showComparison() },
            { id: 'exitComparison', handler: () => this.exitComparison() }
        ];

        toolEvents.forEach(({ id, handler }) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    handler();
                });
            }
        });
    }

    updateNavActiveState(activeBtn) {
        // Remove active state from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active state to clicked button
        activeBtn.classList.add('active');
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        const targetView = document.getElementById(viewName + 'View');
        if (targetView) {
            targetView.classList.add('active');
        }

        // Update navigation state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const navBtn = document.querySelector(`.nav-btn[data-view="${viewName}"]:not(.dropdown-btn)`);
        if (navBtn) {
            navBtn.classList.add('active');
        }

        this.currentView = viewName;

        if (viewName === 'progress') {
            this.updateProgressView();
        }
    }

    showUnit(unitId) {
        const unit = this.courseData.units.find(u => u.id === unitId);
        if (!unit) return;

        this.currentUnit = unitId;
        this.showView('unit');

        // Update unit header information
        const currentUnitEl = document.getElementById('currentUnit');
        const unitTitleEl = document.getElementById('unitTitle');
        const unitHoursEl = document.getElementById('unitHours');
        
        if (currentUnitEl) currentUnitEl.textContent = `Unit ${unitId}`;
        if (unitTitleEl) unitTitleEl.textContent = unit.title;
        if (unitHoursEl) unitHoursEl.textContent = `${unit.hours} hours`;

        // Update progress information
        const progress = this.progress[`unit${unitId}`] || 0;
        const unitProgressFill = document.getElementById('unitProgressFill');
        const unitProgressText = document.getElementById('unitProgressText');
        
        if (unitProgressFill) {
            unitProgressFill.style.width = `${progress}%`;
        }
        if (unitProgressText) {
            unitProgressText.textContent = `${progress}% Complete`;
        }

        // Generate unit content
        this.generateUnitContent(unit);
        
        // Mark progress
        this.updateUnitProgress(unitId, Math.max(progress, 25));
    }

    generateUnitContent(unit) {
        const container = document.getElementById('unitContent');
        if (!container) return;
        
        let html = `
            <div class="unit-intro">
                <p><strong>📚 This unit contains ${unit.questions.length} comprehensive study questions covering key topics in ${unit.title.toLowerCase()}.</strong></p>
            </div>
        `;

        unit.questions.forEach((item, index) => {
            const questionId = `q_${unit.id}_${index}`;
            html += `
                <div class="qa-section fade-in" id="${questionId}">
                    <div class="question-header">
                        <h3 class="question-title">
                            <span class="question-icon">🔸</span>
                            Q${index + 1}. ${item.q}
                        </h3>
                        <button class="bookmark-btn" onclick="app.toggleBookmark('${unit.id}', '${index}', '${item.q.replace(/'/g, "\\'")}')">
                            ${this.isBookmarked(unit.id, index) ? '🔖' : '📑'}
                        </button>
                    </div>
                    
                    <div class="definition-section">
                        <div class="definition-label">📝 Definition:</div>
                        <p class="definition-text">${item.definition}</p>
                    </div>
                    
                    <div class="explanation">
                        <strong>Detailed Explanation:</strong><br>
                        ${item.a}
                    </div>
                    
                    <div class="key-points">
                        <div class="key-points-label">🔑 Key Points:</div>
                        <ul>
                            ${item.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="visual-tip">
                        <div class="visual-tip-label">
                            💡 Visual Tip:
                        </div>
                        <p class="visual-tip-content">Remember this concept by associating it with: ${item.examples.join(', ')}</p>
                    </div>
                    
                    <div class="examples-section">
                        <div class="examples-label">🔍 Examples:</div>
                        <div class="examples-list">
                            ${item.examples.map(ex => `<span class="example-item">${ex}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="unit-summary">
                <div class="key-points">
                    <h4>📚 Unit Summary</h4>
                    <p>You have completed reviewing ${unit.questions.length} comprehensive questions for ${unit.title}. These questions cover the essential concepts you need to understand for this unit.</p>
                    <ul>
                        <li>Use the flashcard tool to practice these questions</li>
                        <li>Take the practice quiz to test your knowledge</li>
                        <li>Bookmark important questions for quick review</li>
                        <li>Track your progress through the Progress section</li>
                    </ul>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Tool Methods
    startFlashcards() {
        const categoryValue = document.getElementById('flashcardCategory')?.value;
        let cards = [];
        
        if (categoryValue === 'all') {
            cards = [...this.flashcards];
        } else {
            const unitId = parseInt(categoryValue);
            cards = this.flashcards.filter(card => card.unit === unitId);
        }
        
        if (cards.length === 0) {
            alert('No flashcards available for this selection.');
            return;
        }
        
        this.currentFlashcards = this.shuffleArray(cards);
        this.currentFlashcard = 0;
        
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'none');
        const flashcardInterface = document.getElementById('flashcardInterface');
        if (flashcardInterface) {
            flashcardInterface.classList.remove('hidden');
        }
        
        this.showCurrentFlashcard();
    }

    showCurrentFlashcard() {
        const card = this.currentFlashcards[this.currentFlashcard];
        const frontEl = document.getElementById('flashcardFront');
        const backEl = document.getElementById('flashcardBack');
        const progressEl = document.getElementById('cardProgress');
        
        if (frontEl) frontEl.textContent = card.front;
        if (backEl) backEl.textContent = card.back;
        if (progressEl) progressEl.textContent = `Card ${this.currentFlashcard + 1} of ${this.currentFlashcards.length}`;
        
        // Show front, hide back
        if (frontEl) frontEl.classList.remove('hidden');
        if (backEl) backEl.classList.add('hidden');
    }

    flipCard() {
        const front = document.getElementById('flashcardFront');
        const back = document.getElementById('flashcardBack');
        
        if (!front || !back) return;
        
        if (front.classList.contains('hidden')) {
            front.classList.remove('hidden');
            back.classList.add('hidden');
        } else {
            front.classList.add('hidden');
            back.classList.remove('hidden');
        }
    }

    nextCard() {
        this.currentFlashcard = (this.currentFlashcard + 1) % this.currentFlashcards.length;
        this.showCurrentFlashcard();
    }

    exitFlashcards() {
        const flashcardInterface = document.getElementById('flashcardInterface');
        if (flashcardInterface) {
            flashcardInterface.classList.add('hidden');
        }
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'block');
    }

    startQuiz() {
        const unitValue = document.getElementById('quizUnit')?.value;
        let questions = [];
        
        if (unitValue === 'all') {
            questions = [...this.quizQuestions];
        } else {
            const unitId = parseInt(unitValue);
            questions = this.quizQuestions.filter(q => q.unit === unitId);
        }
        
        if (questions.length === 0) {
            alert('No questions available for this unit.');
            return;
        }
        
        this.currentQuizQuestions = this.shuffleArray(questions).slice(0, Math.min(10, questions.length));
        this.currentQuestion = 0;
        this.quizScore = 0;
        
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'none');
        const quizInterface = document.getElementById('quizInterface');
        if (quizInterface) {
            quizInterface.classList.remove('hidden');
        }
        
        this.showCurrentQuestion();
    }

    showCurrentQuestion() {
        const question = this.currentQuizQuestions[this.currentQuestion];
        const questionTextEl = document.getElementById('questionText');
        const progressTextEl = document.getElementById('quizProgressText');
        const scoreEl = document.getElementById('quizScore');
        
        if (questionTextEl) questionTextEl.textContent = question.question;
        if (progressTextEl) progressTextEl.textContent = `Question ${this.currentQuestion + 1} of ${this.currentQuizQuestions.length}`;
        if (scoreEl) scoreEl.textContent = `Score: ${this.quizScore}/${this.currentQuestion}`;
        
        const optionsContainer = document.getElementById('quizOptions');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.innerHTML = `
                    <input type="radio" name="quizOption" value="${index}" id="option${index}">
                    <label for="option${index}">${option}</label>
                `;
                optionDiv.addEventListener('click', () => {
                    const radio = document.getElementById(`option${index}`);
                    if (radio) radio.checked = true;
                    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                    optionDiv.classList.add('selected');
                });
                optionsContainer.appendChild(optionDiv);
            });
        }
        
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.display = 'inline-block';
        }
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
    }

    submitAnswer() {
        const selectedOption = document.querySelector('input[name="quizOption"]:checked');
        if (!selectedOption) {
            alert('Please select an answer.');
            return;
        }
        
        const question = this.currentQuizQuestions[this.currentQuestion];
        const selectedIndex = parseInt(selectedOption.value);
        const isCorrect = selectedIndex === question.correct;
        
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            this.quizScore++;
        }
        
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        const scoreEl = document.getElementById('quizScore');
        
        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (scoreEl) scoreEl.textContent = `Score: ${this.quizScore}/${this.currentQuestion + 1}`;
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= this.currentQuizQuestions.length) {
            this.showQuizResults();
        } else {
            this.showCurrentQuestion();
        }
    }

    showQuizResults() {
        const percentage = Math.round((this.quizScore / this.currentQuizQuestions.length) * 100);
        let message = `Quiz Complete!\nScore: ${this.quizScore}/${this.currentQuizQuestions.length} (${percentage}%)`;
        
        if (percentage >= 80) {
            message += "\n🎉 Excellent work!";
        } else if (percentage >= 60) {
            message += "\n👍 Good job! Review and try again.";
        } else {
            message += "\n📚 Keep studying! You can do better.";
        }
        
        alert(message);
        this.exitQuiz();
    }

    exitQuiz() {
        const quizInterface = document.getElementById('quizInterface');
        if (quizInterface) {
            quizInterface.classList.add('hidden');
        }
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'block');
    }

    showComparison() {
        const typeEl = document.getElementById('comparisonType');
        const type = typeEl ? typeEl.value : 'routing';
        
        const comparisons = {
            'routing': {
                title: 'Routing Protocols Comparison: AODV vs DSR vs OLSR',
                headers: ['Protocol', 'Type', 'Route Discovery', 'Route Maintenance', 'Overhead'],
                rows: [
                    ['AODV', 'Reactive', 'On-demand flooding', 'Route error messages', 'Medium'],
                    ['DSR', 'Reactive', 'Source route accumulation', 'Route caching', 'High'],
                    ['OLSR', 'Proactive', 'Link state flooding', 'Periodic updates', 'High but constant']
                ]
            },
            'mac': {
                title: 'MAC Protocols Comparison: CSMA vs MACA vs MACAW',
                headers: ['Protocol', 'Access Method', 'Collision Handling', 'Hidden Terminal', 'Complexity'],
                rows: [
                    ['CSMA/CA', 'Listen before talk', 'Exponential backoff', 'Partial solution', 'Low'],
                    ['MACA', 'RTS/CTS handshake', 'Virtual carrier sense', 'Solved', 'Medium'],
                    ['MACAW', 'Enhanced MACA', 'ACK + backoff', 'Solved + fairness', 'High']
                ]
            },
            'localization': {
                title: 'Localization Techniques Comparison: RSSI vs TOA vs TDOA',
                headers: ['Technique', 'Measurement', 'Hardware', 'Accuracy', 'Synchronization'],
                rows: [
                    ['RSSI', 'Signal strength', 'Simple receiver', 'Variable', 'Not required'],
                    ['TOA', 'Signal travel time', 'Precise timing', 'High', 'Required'],
                    ['TDOA', 'Time differences', 'Synchronized nodes', 'High', 'Partial']
                ]
            },
            'topology': {
                title: 'WSN Topologies Comparison: Star vs Mesh vs Cluster',
                headers: ['Topology', 'Structure', 'Reliability', 'Scalability', 'Energy Efficiency'],
                rows: [
                    ['Star', 'Central coordinator', 'Single point failure', 'Limited', 'Good for coordinator'],
                    ['Mesh', 'Fully connected', 'High redundancy', 'Good', 'Distributed load'],
                    ['Cluster', 'Hierarchical groups', 'Moderate', 'Excellent', 'Optimized']
                ]
            },
            'energy': {
                title: 'Energy Management Strategies Comparison',
                headers: ['Strategy', 'Approach', 'Energy Savings', 'Latency Impact', 'Implementation'],
                rows: [
                    ['Active', 'Always listening', 'Low savings', 'Minimal', 'Simple'],
                    ['Passive', 'Sleep scheduling', 'High savings', 'Moderate', 'Medium complexity'],
                    ['Hybrid', 'Adaptive switching', 'Optimized', 'Variable', 'Complex']
                ]
            }
        };
        
        const comparisonData = comparisons[type];
        
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'none');
        const comparisonInterface = document.getElementById('comparisonInterface');
        if (comparisonInterface) {
            comparisonInterface.classList.remove('hidden');
        }
        
        const content = document.getElementById('comparisonContent');
        if (content) {
            content.innerHTML = `
                <h3>${comparisonData.title}</h3>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            ${comparisonData.headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${comparisonData.rows.map(row => `
                            <tr>
                                ${row.map((cell, index) => `
                                    <td${index === 0 ? ' style="font-weight: bold;"' : ''}>${cell}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    }

    exitComparison() {
        const comparisonInterface = document.getElementById('comparisonInterface');
        if (comparisonInterface) {
            comparisonInterface.classList.add('hidden');
        }
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'block');
    }

    showTool(toolName) {
        const toolMap = {
            'flashcards': 'startFlashcards',
            'quiz': 'startQuiz', 
            'compare': 'showComparison'
        };
        
        const toolFunction = toolMap[toolName];
        if (toolFunction && this[toolFunction]) {
            setTimeout(() => {
                this[toolFunction]();
            }, 100);
        }
    }

    // Utility Methods
    handleSearch(query) {
        if (query.length < 2) return;
        
        const results = [];
        query = query.toLowerCase();
        
        this.courseData.units.forEach(unit => {
            unit.questions.forEach((item, index) => {
                if (item.q.toLowerCase().includes(query) || 
                    item.a.toLowerCase().includes(query) ||
                    item.definition.toLowerCase().includes(query)) {
                    results.push({
                        unit: unit.id,
                        unitTitle: unit.title,
                        questionIndex: index,
                        question: item.q
                    });
                }
            });
        });
        
        if (results.length > 0) {
            this.showSearchResults(results, query);
        } else {
            alert(`No results found for "${query}"`);
        }
    }

    clearSearch() {
        if (this.currentView === 'home') {
            this.showView('home');
        }
    }

    showSearchResults(results, query) {
        let message = `Found ${results.length} results for "${query}":\n\n`;
        
        results.slice(0, 5).forEach(r => {
            message += `Unit ${r.unit}: ${r.question}\n\n`;
        });
        
        if (results.length > 5) {
            message += '(Showing first 5 results)';
        }
        
        alert(message);
        
        // Navigate to first result if available
        if (results.length > 0) {
            this.showUnit(results[0].unit);
        }
    }

    toggleBookmark(unitId, questionIndex, question) {
        const bookmarkId = `${unitId}-${questionIndex}`;
        const existingIndex = this.bookmarks.findIndex(b => b.id === bookmarkId);
        
        if (existingIndex >= 0) {
            this.bookmarks.splice(existingIndex, 1);
        } else {
            this.bookmarks.push({
                id: bookmarkId,
                unitId,
                questionIndex,
                question,
                unitTitle: this.courseData.units.find(u => u.id == unitId).title
            });
        }
        
        localStorage.setItem('adhoc_bookmarks', JSON.stringify(this.bookmarks));
        
        // Refresh current view if in unit view
        if (this.currentView === 'unit') {
            this.showUnit(this.currentUnit);
        }
    }

    isBookmarked(unitId, questionIndex) {
        const bookmarkId = `${unitId}-${questionIndex}`;
        return this.bookmarks.some(b => b.id === bookmarkId);
    }

    updateUnitProgress(unitId, progress) {
        this.progress[`unit${unitId}`] = Math.min(100, Math.max(0, progress));
        localStorage.setItem('adhoc_progress', JSON.stringify(this.progress));
        this.updateProgress();
    }

    updateProgress() {
        document.querySelectorAll('.unit-card').forEach(card => {
            const unitId = card.getAttribute('data-unit');
            const progress = this.progress[`unit${unitId}`] || 0;
            const progressFill = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.progress-text');
            
            if (progressFill && progressText) {
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${progress}% Complete`;
            }
        });
    }

    updateProgressView() {
        const overallProgress = this.calculateOverallProgress();
        const overallProgressEl = document.getElementById('overallProgress');
        const overallProgressTextEl = document.getElementById('overallProgressText');
        
        if (overallProgressEl) {
            overallProgressEl.style.width = `${overallProgress}%`;
        }
        if (overallProgressTextEl) {
            overallProgressTextEl.textContent = `${overallProgress}% Complete`;
        }
        
        const progressList = document.getElementById('progressList');
        if (progressList) {
            progressList.innerHTML = '';
            
            this.courseData.units.forEach(unit => {
                const progress = this.progress[`unit${unit.id}`] || 0;
                const progressItem = document.createElement('div');
                progressItem.className = 'progress-item';
                progressItem.innerHTML = `
                    <div class="progress-item-info">
                        <h4>Unit ${unit.id}: ${unit.title}</h4>
                        <p>${unit.hours} hours • ${unit.questions.length} questions</p>
                    </div>
                    <div class="unit-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="progress-text">${progress}%</span>
                    </div>
                `;
                progressList.appendChild(progressItem);
            });
        }
        
        const bookmarksList = document.getElementById('bookmarksList');
        if (bookmarksList) {
            if (this.bookmarks.length === 0) {
                bookmarksList.innerHTML = '<p class="no-bookmarks">No bookmarks yet. Click the bookmark icon on any topic to save it here.</p>';
            } else {
                bookmarksList.innerHTML = this.bookmarks.map(bookmark => `
                    <div class="bookmark-item">
                        <div>
                            <strong>Unit ${bookmark.unitId}:</strong> ${bookmark.question}
                        </div>
                        <button onclick="app.showUnit(${bookmark.unitId})" class="btn btn--sm btn--primary">View</button>
                    </div>
                `).join('');
            }
        }
    }

    calculateOverallProgress() {
        const totalUnits = this.courseData.units.length;
        let totalProgress = 0;
        
        this.courseData.units.forEach(unit => {
            totalProgress += this.progress[`unit${unit.id}`] || 0;
        });
        
        return Math.round(totalProgress / totalUnits);
    }
}

// Initialize the application
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new AdHocNetworkSensorsApp();
    });
} else {
    app = new AdHocNetworkSensorsApp();
}