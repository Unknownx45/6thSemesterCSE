// Network Security Study Guide JavaScript - Fixed Navigation & Full Functionality

class NetworkSecurityApp {
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
            return JSON.parse(localStorage.getItem('ns_progress') || '{}');
        } catch {
            return {};
        }
    }

    loadBookmarks() {
        try {
            return JSON.parse(localStorage.getItem('ns_bookmarks') || '[]');
        } catch {
            return [];
        }
    }

    initializeData() {
        // Enhanced course data with comprehensive questions per unit
        this.courseData = {
            units: [
                {
                    id: 1,
                    title: "Introduction to Network Security",
                    hours: 7,
                    questions: [
                        {
                            q: "What is Network Security? Explain its fundamentals and importance.",
                            a: "Network Security is the practice of protecting computer networks from unauthorized access, misuse, malicious attacks, or data theft.",
                            definition: "A comprehensive approach to protecting network infrastructure and data",
                            keyPoints: [
                                "Protects confidentiality, integrity, and availability of data",
                                "Involves policies, procedures, and technologies", 
                                "Critical for business continuity and compliance",
                                "Requires layered defense approach"
                            ],
                            examples: ["Firewalls", "Encryption", "Access Controls", "Monitoring"]
                        },
                        {
                            q: "What are Security Threats and Attack Vectors? Explain with examples.",
                            a: "Security threats are potential dangers that could exploit vulnerabilities, while attack vectors are methods used to gain unauthorized access.",
                            definition: "Threats are potential risks; vectors are specific attack methods",
                            keyPoints: [
                                "Threats can be internal or external",
                                "Attack vectors exploit system weaknesses",
                                "Understanding helps in defense planning",
                                "Constantly evolving landscape"
                            ],
                            examples: ["Malware", "Phishing", "DDoS", "Social Engineering"]
                        },
                        {
                            q: "What is Vulnerability Assessment? Explain its process and methodology.",
                            a: "Systematic evaluation of security weaknesses in systems, networks, or applications to identify potential security risks.",
                            definition: "Proactive identification and analysis of security weaknesses",
                            keyPoints: [
                                "Identifies security gaps before exploitation",
                                "Uses automated tools and manual testing",
                                "Regular assessments are crucial",
                                "Results guide remediation efforts"
                            ],
                            examples: ["Network Scans", "Port Analysis", "Configuration Reviews", "Penetration Testing"]
                        },
                        {
                            q: "Explain Risk Management framework and its components.",
                            a: "Structured approach to identifying, assessing, treating, and monitoring risks to organizational assets and operations.",
                            definition: "Systematic process for managing organizational security risks",
                            keyPoints: [
                                "Risk identification and analysis",
                                "Risk assessment and prioritization",
                                "Risk treatment strategies",
                                "Continuous monitoring and review"
                            ],
                            examples: ["Risk Registers", "Impact Analysis", "Mitigation Plans", "KRI Monitoring"]
                        },
                        {
                            q: "Compare NIST Cybersecurity Framework and ISO 27001 standard.",
                            a: "NIST CSF provides flexible guidelines for cybersecurity risk management, while ISO 27001 is a certifiable standard for information security management systems.",
                            definition: "Two leading cybersecurity governance frameworks",
                            keyPoints: [
                                "NIST CSF: Voluntary, flexible, outcome-focused",
                                "ISO 27001: Mandatory for certification, process-focused",
                                "Both emphasize risk-based approach",
                                "Can be used complementarily"
                            ],
                            examples: ["NIST Functions", "ISO Controls", "Audit Requirements", "Compliance Reports"]
                        },
                        {
                            q: "What are Security Policies? Explain their types and importance.",
                            a: "High-level statements defining organizational security objectives, rules, and responsibilities for protecting information assets.",
                            definition: "Formal documents governing organizational security practices",
                            keyPoints: [
                                "Provide security governance structure",
                                "Define roles and responsibilities",
                                "Enable compliance and accountability",
                                "Guide security implementation"
                            ],
                            examples: ["Acceptable Use", "Access Control", "Incident Response", "Data Classification"]
                        },
                        {
                            q: "Explain Incident Response process and its phases.",
                            a: "Structured approach to handling security incidents through preparation, detection, containment, eradication, recovery, and lessons learned.",
                            definition: "Systematic process for managing security incidents",
                            keyPoints: [
                                "Minimizes impact and recovery time",
                                "Preserves evidence for analysis",
                                "Enables continuous improvement",
                                "Requires coordination and communication"
                            ],
                            examples: ["IR Teams", "Playbooks", "Communication Plans", "Forensic Tools"]
                        },
                        {
                            q: "What is Business Continuity Planning? How does it differ from Disaster Recovery?",
                            a: "BCP ensures business operations continue during disruptions, while DR focuses specifically on restoring IT systems and data after incidents.",
                            definition: "BCP is broader operational continuity; DR is IT-focused recovery",
                            keyPoints: [
                                "BCP covers entire business operations",
                                "DR focuses on technology recovery",
                                "Both require regular testing",
                                "Integration is essential for effectiveness"
                            ],
                            examples: ["Recovery Sites", "Backup Systems", "Communication Plans", "Alternate Processes"]
                        },
                        {
                            q: "Explain Defense in Depth security strategy and its layers.",
                            a: "Multi-layered security approach using multiple defensive measures to protect information assets at different levels.",
                            definition: "Layered security strategy providing multiple protection barriers",
                            keyPoints: [
                                "Physical, technical, and administrative layers",
                                "Reduces single point of failure risk",
                                "Each layer adds security value",
                                "Comprehensive protection approach"
                            ],
                            examples: ["Perimeter Security", "Network Segmentation", "Access Controls", "Monitoring"]
                        },
                        {
                            q: "What is Security Awareness Training? Explain its importance and components.",
                            a: "Educational programs designed to help users understand security risks and adopt secure behaviors in their daily work activities.",
                            definition: "Training programs to improve user security knowledge and behavior",
                            keyPoints: [
                                "Addresses human factor in security",
                                "Reduces social engineering risks",
                                "Promotes security culture",
                                "Requires regular updates and reinforcement"
                            ],
                            examples: ["Phishing Simulations", "Policy Training", "Incident Reporting", "Security Updates"]
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Cryptography and Key Management",
                    hours: 7,
                    questions: [
                        {
                            q: "Explain Symmetric Key Cryptography. Compare DES, AES, and RC4.",
                            a: "Symmetric cryptography uses the same key for encryption and decryption. DES (56-bit) is deprecated, AES (128/192/256-bit) is current standard, RC4 is a stream cipher with known vulnerabilities.",
                            definition: "Cryptographic system using same key for encryption and decryption",
                            keyPoints: [
                                "Fast encryption/decryption process",
                                "Key distribution challenge",
                                "Suitable for bulk data encryption",
                                "Requires secure key exchange"
                            ],
                            examples: ["AES-256", "ChaCha20", "Blowfish", "Twofish"]
                        },
                        {
                            q: "Explain Asymmetric Key Cryptography. Compare RSA and ECC algorithms.",
                            a: "Asymmetric cryptography uses key pairs (public/private). RSA is widely used but requires large keys, while ECC provides equivalent security with smaller keys and better performance.",
                            definition: "Public-key cryptography using mathematically related key pairs",
                            keyPoints: [
                                "Solves key distribution problem",
                                "Enables digital signatures",
                                "Computationally intensive",
                                "Foundation for PKI systems"
                            ],
                            examples: ["RSA-2048", "ECDSA P-256", "Ed25519", "Curve25519"]
                        },
                        {
                            q: "Explain Diffie-Hellman Key Exchange algorithm and its significance.",
                            a: "Protocol allowing parties to establish shared secret over insecure channel without prior key sharing, forming basis for secure communications.",
                            definition: "Key agreement protocol for secure key establishment",
                            keyPoints: [
                                "Enables secure key agreement",
                                "Resistant to passive eavesdropping",
                                "Vulnerable to man-in-the-middle attacks",
                                "Foundation for many protocols"
                            ],
                            examples: ["DHE", "ECDHE", "TLS Key Exchange", "IKE Protocol"]
                        },
                        {
                            q: "What are Hash Functions? Compare MD5, SHA-1, and SHA-256.",
                            a: "One-way functions creating fixed-size output from variable input. MD5 and SHA-1 are cryptographically broken, SHA-256 is current secure standard.",
                            definition: "Mathematical functions creating unique fingerprints of data",
                            keyPoints: [
                                "Provide data integrity verification",
                                "One-way computation property",
                                "Collision resistance important",
                                "Used in digital signatures"
                            ],
                            examples: ["SHA-256", "SHA-3", "BLAKE2", "Argon2"]
                        },
                        {
                            q: "Explain Public Key Infrastructure (PKI). What are its main components?",
                            a: "Framework managing digital certificates and public-private key pairs, including Certificate Authorities (CA), Registration Authorities (RA), certificates, and revocation mechanisms.",
                            definition: "Infrastructure for managing digital certificates and keys",
                            keyPoints: [
                                "Establishes trust relationships",
                                "Manages certificate lifecycle",
                                "Enables authentication and encryption",
                                "Critical for secure communications"
                            ],
                            examples: ["Root CA", "Intermediate CA", "End-user Certificates", "CRL/OCSP"]
                        },
                        {
                            q: "How do Digital Signatures work? Explain the signing and verification process.",
                            a: "Signer creates hash of message and encrypts with private key. Verifier decrypts signature with public key and compares with computed hash.",
                            definition: "Cryptographic mechanism for authenticity and non-repudiation",
                            keyPoints: [
                                "Provides authentication and integrity",
                                "Non-repudiation of origin",
                                "Uses asymmetric cryptography",
                                "Legally recognized in many jurisdictions"
                            ],
                            examples: ["RSA Signatures", "ECDSA", "DSA", "EdDSA"]
                        },
                        {
                            q: "Explain Key Management lifecycle and best practices.",
                            a: "Comprehensive process covering key generation, distribution, storage, rotation, backup, recovery, and destruction throughout their operational lifetime.",
                            definition: "End-to-end process for managing cryptographic keys",
                            keyPoints: [
                                "Secure key generation required",
                                "Proper key storage and protection",
                                "Regular key rotation policies",
                                "Secure key destruction"
                            ],
                            examples: ["HSMs", "Key Escrow", "Key Rotation", "Secure Deletion"]
                        },
                        {
                            q: "What is Perfect Forward Secrecy (PFS)? Why is it important?",
                            a: "Property ensuring that compromise of long-term keys doesn't compromise past session keys, providing protection for historical communications.",
                            definition: "Security property protecting past sessions from future key compromise",
                            keyPoints: [
                                "Protects historical communications",
                                "Uses ephemeral key exchange",
                                "Important for long-term security",
                                "Standard in modern protocols"
                            ],
                            examples: ["DHE", "ECDHE", "TLS 1.3", "Signal Protocol"]
                        },
                        {
                            q: "Explain Cryptographic Attacks and countermeasures.",
                            a: "Various methods to break cryptographic systems including brute force, cryptanalysis, side-channel attacks, and implementation flaws, countered by strong algorithms, proper implementation, and security practices.",
                            definition: "Methods used to compromise cryptographic security",
                            keyPoints: [
                                "Attack sophistication constantly evolving",
                                "Implementation vulnerabilities common",
                                "Side-channel attacks target implementation",
                                "Defense requires multiple approaches"
                            ],
                            examples: ["Timing Attacks", "Power Analysis", "Birthday Attacks", "Quantum Threats"]
                        },
                        {
                            q: "What are Cryptographic Protocols? Explain key agreement and authentication protocols.",
                            a: "Structured communications procedures using cryptographic primitives to achieve security goals like confidentiality, authentication, and integrity.",
                            definition: "Formal procedures for secure communications using cryptography",
                            keyPoints: [
                                "Combine multiple cryptographic primitives",
                                "Provide end-to-end security",
                                "Require careful design and analysis",
                                "Enable secure distributed systems"
                            ],
                            examples: ["TLS/SSL", "IPSec", "SSH", "Kerberos"]
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Authentication and Access Control",
                    hours: 7,
                    questions: [
                        {
                            q: "What are Authentication Factors? Explain Multi-Factor Authentication (MFA).",
                            a: "Authentication factors are categories of credentials: something you know (passwords), have (tokens), and are (biometrics). MFA combines multiple factors for stronger security.",
                            definition: "Different types of credentials used to verify user identity",
                            keyPoints: [
                                "Three main factor categories exist",
                                "MFA significantly improves security",
                                "Reduces single point of failure",
                                "Industry best practice adoption"
                            ],
                            examples: ["Passwords + SMS", "Smart Cards + PIN", "Biometrics + Token", "App-based OTP"]
                        },
                        {
                            q: "Explain Biometric Authentication. What are its advantages and challenges?",
                            a: "Authentication using unique biological characteristics. Advantages include convenience and difficulty to share/steal. Challenges include privacy concerns, false positives/negatives, and inability to revoke.",
                            definition: "Authentication based on unique biological or behavioral characteristics",
                            keyPoints: [
                                "Based on unique physical traits",
                                "Convenient user experience",
                                "Difficult to forge or share",
                                "Privacy and revocation challenges"
                            ],
                            examples: ["Fingerprint", "Facial Recognition", "Iris Scan", "Voice Recognition"]
                        },
                        {
                            q: "Compare Access Control Models: DAC, MAC, and RBAC.",
                            a: "DAC (Discretionary): owner controls access. MAC (Mandatory): system enforces access based on labels. RBAC (Role-Based): permissions assigned to roles, users assigned to roles.",
                            definition: "Different approaches to controlling resource access",
                            keyPoints: [
                                "DAC provides maximum flexibility",
                                "MAC provides highest security",
                                "RBAC balances security and manageability",
                                "Choice depends on requirements"
                            ],
                            examples: ["File Permissions", "Security Classifications", "Job Functions", "Privilege Levels"]
                        },
                        {
                            q: "What is Single Sign-On (SSO)? Explain its benefits and implementation.",
                            a: "Authentication system allowing users to access multiple applications with one set of credentials. Benefits include improved user experience and centralized access control.",
                            definition: "Unified authentication system for multiple applications",
                            keyPoints: [
                                "One login for multiple systems",
                                "Improved user productivity",
                                "Centralized access management",
                                "Reduced password fatigue"
                            ],
                            examples: ["SAML", "OpenID Connect", "Kerberos", "OAuth 2.0"]
                        },
                        {
                            q: "Explain OAuth 2.0 protocol and its flow.",
                            a: "Authorization framework enabling applications to obtain limited access to user accounts. Flow involves authorization request, user consent, authorization grant, and access token issuance.",
                            definition: "Delegated authorization framework for secure API access",
                            keyPoints: [
                                "Enables delegated authorization",
                                "No password sharing required",
                                "Token-based access control",
                                "Supports various grant types"
                            ],
                            examples: ["Authorization Code", "Client Credentials", "Resource Owner", "JWT Tokens"]
                        },
                        {
                            q: "How does Kerberos Authentication work? Explain the ticket-based system.",
                            a: "Network authentication protocol using tickets for secure authentication. Users authenticate to Key Distribution Center (KDC), receive Ticket Granting Ticket (TGT), then request service tickets for specific resources.",
                            definition: "Ticket-based network authentication protocol",
                            keyPoints: [
                                "Uses symmetric key cryptography",
                                "Centralized authentication server",
                                "Time-limited tickets prevent replay",
                                "Mutual authentication support"
                            ],
                            examples: ["TGT Tickets", "Service Tickets", "KDC Server", "Realm Authentication"]
                        },
                        {
                            q: "What is Zero Trust Security Model? Explain its core principles.",
                            a: "Security model that assumes no implicit trust and continuously validates every transaction. Core principles: verify explicitly, use least privilege access, and assume breach.",
                            definition: "Security architecture based on 'never trust, always verify' principle",
                            keyPoints: [
                                "No implicit trust assumptions",
                                "Continuous verification required",
                                "Least privilege access enforcement",
                                "Assume breach mentality"
                            ],
                            examples: ["Identity Verification", "Device Compliance", "Network Segmentation", "Conditional Access"]
                        },
                        {
                            q: "Explain Privileged Access Management (PAM). Why is it important?",
                            a: "Cybersecurity strategy controlling and monitoring privileged accounts with elevated access. Critical because privileged accounts are high-value targets and can cause maximum damage if compromised.",
                            definition: "Security solution for managing accounts with elevated privileges",
                            keyPoints: [
                                "Controls administrator accounts",
                                "Monitors privileged activities",
                                "Implements just-in-time access",
                                "Critical for insider threat prevention"
                            ],
                            examples: ["Password Vaults", "Session Recording", "Access Reviews", "Privilege Elevation"]
                        },
                        {
                            q: "What is Identity and Access Management (IAM)? Explain its lifecycle.",
                            a: "Framework for managing digital identities and their access to resources. Lifecycle includes provisioning, authentication, authorization, and deprovisioning of user accounts and privileges.",
                            definition: "Comprehensive framework for managing user identities and access rights",
                            keyPoints: [
                                "Manages entire identity lifecycle",
                                "Centralizes access control",
                                "Ensures compliance and governance",
                                "Integrates with business processes"
                            ],
                            examples: ["User Provisioning", "Access Reviews", "Role Mining", "Identity Governance"]
                        },
                        {
                            q: "Explain Federated Identity Management and its benefits.",
                            a: "System allowing users to access multiple systems across organizational boundaries using single identity. Benefits include reduced administrative overhead, improved user experience, and enhanced security.",
                            definition: "Identity management across organizational boundaries",
                            keyPoints: [
                                "Cross-domain identity sharing",
                                "Reduces identity silos",
                                "Enables business partnerships",
                                "Standards-based integration"
                            ],
                            examples: ["SAML Federation", "Trust Relationships", "Identity Providers", "Service Providers"]
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Network Security Protocols",
                    hours: 7,
                    questions: [
                        {
                            q: "Explain SSL/TLS protocols. How does the handshake process work?",
                            a: "SSL/TLS provides secure communication over networks through encryption, authentication, and integrity. Handshake involves client hello, server hello, certificate exchange, key agreement, and finished messages.",
                            definition: "Cryptographic protocols securing communications over computer networks",
                            keyPoints: [
                                "Provides encryption and authentication",
                                "Uses hybrid cryptography approach",
                                "Multiple protocol versions available",
                                "Foundation for HTTPS and other protocols"
                            ],
                            examples: ["HTTPS", "Email Security", "VPN Tunnels", "API Security"]
                        },
                        {
                            q: "What is IPSec? Explain AH and ESP protocols.",
                            a: "IPSec is suite of protocols for securing IP communications. AH (Authentication Header) provides authentication and integrity, ESP (Encapsulating Security Payload) adds encryption for confidentiality.",
                            definition: "Internet Protocol Security suite for IP packet authentication and encryption",
                            keyPoints: [
                                "Operates at network layer",
                                "Supports two main protocols",
                                "Transport and tunnel modes",
                                "Foundation for VPN implementations"
                            ],
                            examples: ["Site-to-Site VPN", "Remote Access VPN", "Network Security", "Mobile Security"]
                        },
                        {
                            q: "What are VPNs? Explain different types and their implementations.",
                            a: "Virtual Private Networks create secure connections over public networks. Types include site-to-site (connecting networks) and remote access (connecting users), implemented using various tunneling protocols.",
                            definition: "Encrypted connections creating private networks over public infrastructure",
                            keyPoints: [
                                "Extends private networks securely",
                                "Multiple implementation types",
                                "Uses tunneling and encryption",
                                "Critical for remote work security"
                            ],
                            examples: ["OpenVPN", "WireGuard", "IKEv2", "SSTP"]
                        },
                        {
                            q: "Explain Wireless Security protocols. Compare WEP, WPA, WPA2, and WPA3.",
                            a: "Evolution of wireless security: WEP (broken, deprecated), WPA (improvement with TKIP), WPA2 (current standard with AES), WPA3 (latest with enhanced security features).",
                            definition: "Protocols securing wireless network communications",
                            keyPoints: [
                                "Continuous security improvements",
                                "WEP and WPA are deprecated",
                                "WPA2 still widely used",
                                "WPA3 provides latest security"
                            ],
                            examples: ["Personal vs Enterprise", "Pre-shared Keys", "802.1X Authentication", "SAE Handshake"]
                        },
                        {
                            q: "What is Email Security? Explain PGP and S/MIME.",
                            a: "Email security protects email communications. PGP uses web of trust model with user-managed keys, while S/MIME uses PKI with certificate authorities for enterprise environments.",
                            definition: "Technologies protecting email confidentiality, integrity, and authenticity",
                            keyPoints: [
                                "Addresses email vulnerabilities",
                                "Two main standards available",
                                "Different trust models",
                                "Integration with email clients"
                            ],
                            examples: ["Email Encryption", "Digital Signatures", "Certificate Management", "Key Distribution"]
                        },
                        {
                            q: "Compare different Network Security Protocols and their use cases.",
                            a: "Various protocols serve different purposes: TLS for web security, IPSec for network layer security, SSH for remote access, WPA for wireless security, each optimized for specific scenarios.",
                            definition: "Different protocols addressing specific network security requirements",
                            keyPoints: [
                                "Each protocol has specific purpose",
                                "Layer-specific implementations",
                                "Performance vs security tradeoffs",
                                "Interoperability considerations"
                            ],
                            examples: ["Web Applications", "Network Infrastructure", "Remote Administration", "Wireless Networks"]
                        },
                        {
                            q: "Explain TLS handshake process in detail.",
                            a: "Multi-step process: ClientHello (cipher suites), ServerHello (certificate), key exchange (DH/RSA), authentication verification, and finished messages establishing secure channel.",
                            definition: "Detailed process for establishing secure TLS connections",
                            keyPoints: [
                                "Multiple round trips required",
                                "Cipher suite negotiation",
                                "Certificate validation",
                                "Key agreement mechanisms"
                            ],
                            examples: ["TLS 1.2 Handshake", "TLS 1.3 Improvements", "Certificate Chains", "Session Resumption"]
                        },
                        {
                            q: "What are different VPN deployment models?",
                            a: "VPN deployments include remote access (user to network), site-to-site (network to network), host-to-host (device to device), and cloud-based VPN services.",
                            definition: "Various architectural approaches for VPN implementation",
                            keyPoints: [
                                "Different connectivity requirements",
                                "Scalability considerations",
                                "Management complexity varies",
                                "Cost and performance factors"
                            ],
                            examples: ["Client VPN", "Gateway-to-Gateway", "Mesh Networks", "Cloud VPN Services"]
                        },
                        {
                            q: "Explain Wireless Security attacks and their countermeasures.",
                            a: "Common attacks include eavesdropping, evil twins, deauthentication, and WPS attacks. Countermeasures involve strong encryption, proper configuration, monitoring, and user education.",
                            definition: "Threats to wireless networks and protective measures",
                            keyPoints: [
                                "Wireless medium inherently insecure",
                                "Multiple attack vectors exist",
                                "Layered defense approach needed",
                                "Regular security updates important"
                            ],
                            examples: ["Rogue Access Points", "Man-in-the-Middle", "Packet Injection", "Wireless IDS"]
                        },
                        {
                            q: "What are Email threats and protection mechanisms?",
                            a: "Email threats include phishing, malware, spam, and business email compromise. Protection involves filtering, encryption, authentication (SPF/DKIM/DMARC), and user training.",
                            definition: "Email-based security threats and defensive technologies",
                            keyPoints: [
                                "Email remains major attack vector",
                                "Multiple threat categories",
                                "Technical and human controls needed",
                                "Continuous threat evolution"
                            ],
                            examples: ["Email Gateways", "Sandboxing", "URL Rewriting", "Security Awareness"]
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Firewalls, IDS, and Security Architectures",
                    hours: 7,
                    questions: [
                        {
                            q: "What are different types of Firewalls? Compare packet filtering, stateful, and proxy-based.",
                            a: "Packet filtering examines headers only, stateful tracks connection states, proxy-based performs deep inspection at application layer with highest security but performance impact.",
                            definition: "Different firewall technologies providing various levels of network protection",
                            keyPoints: [
                                "Evolution from simple to sophisticated",
                                "Performance vs security tradeoffs",
                                "Different deployment scenarios",
                                "Complementary technologies available"
                            ],
                            examples: ["ACL Rules", "Connection Tables", "Application Gateways", "Next-Gen Firewalls"]
                        },
                        {
                            q: "What is the difference between IDS and IPS? Explain their deployment methods.",
                            a: "IDS (Intrusion Detection System) monitors and alerts passively, deployed out-of-band. IPS (Intrusion Prevention System) actively blocks threats, deployed inline with network traffic.",
                            definition: "Systems for detecting and preventing network intrusions",
                            keyPoints: [
                                "IDS provides monitoring and alerting",
                                "IPS provides active blocking",
                                "Different deployment architectures",
                                "Complementary security functions"
                            ],
                            examples: ["Network IDS", "Host IDS", "Inline IPS", "Hybrid Deployments"]
                        },
                        {
                            q: "What are Honeypots? Explain different types and their benefits.",
                            a: "Honeypots are decoy systems designed to attract and analyze attackers. Types include low-interaction (simulated services) and high-interaction (full systems) with benefits of threat intelligence and distraction.",
                            definition: "Deception technology using decoy systems to detect and analyze attacks",
                            keyPoints: [
                                "Attracts and studies attackers",
                                "Provides threat intelligence",
                                "Different complexity levels",
                                "Minimal false positives"
                            ],
                            examples: ["SSH Honeypots", "Web Honeypots", "Database Honeypots", "IoT Honeypots"]
                        },
                        {
                            q: "Explain Network Security Architecture and its layers.",
                            a: "Structured approach to network security using multiple layers: perimeter security, network segmentation, access controls, monitoring, and incident response capabilities.",
                            definition: "Comprehensive framework for designing secure network infrastructures",
                            keyPoints: [
                                "Multiple security layers required",
                                "Defense in depth strategy",
                                "Risk-based design approach",
                                "Scalability and performance considerations"
                            ],
                            examples: ["DMZ Design", "Internal Segmentation", "Security Zones", "Micro-segmentation"]
                        },
                        {
                            q: "How to implement Zero Trust Architecture in networks?",
                            a: "Zero Trust implementation involves identity verification, device compliance checking, network micro-segmentation, encrypted communications, and continuous monitoring of all network activities.",
                            definition: "Network architecture based on zero trust security principles",
                            keyPoints: [
                                "Never trust, always verify",
                                "Micro-segmentation required",
                                "Continuous verification",
                                "Policy-driven access control"
                            ],
                            examples: ["Identity-based Access", "Device Certificates", "Network Policies", "Behavioral Analytics"]
                        },
                        {
                            q: "What is DMZ? Explain its configuration and components.",
                            a: "Demilitarized Zone is network segment separating internal networks from untrusted external networks, typically containing public-facing services with controlled access rules.",
                            definition: "Network buffer zone between internal and external networks",
                            keyPoints: [
                                "Isolates public-facing services",
                                "Controlled access rules",
                                "Multiple firewall configuration",
                                "Reduces internal network exposure"
                            ],
                            examples: ["Web Servers", "Email Servers", "DNS Servers", "Proxy Servers"]
                        },
                        {
                            q: "Explain Network Segmentation strategies and benefits.",
                            a: "Dividing networks into smaller segments using VLANs, subnets, and firewalls to limit attack propagation, improve performance, and enable granular access control.",
                            definition: "Strategy of dividing networks into smaller, controlled segments",
                            keyPoints: [
                                "Limits lateral movement",
                                "Improves network performance",
                                "Enables granular controls",
                                "Supports compliance requirements"
                            ],
                            examples: ["VLANs", "Subnetting", "Software-Defined Perimeter", "Micro-segmentation"]
                        },
                        {
                            q: "What are different Intrusion Detection methods?",
                            a: "IDS methods include signature-based (pattern matching), anomaly-based (behavioral analysis), and hybrid approaches combining both techniques for comprehensive threat detection.",
                            definition: "Various techniques for identifying potential security intrusions",
                            keyPoints: [
                                "Signature-based detection",
                                "Anomaly-based detection",
                                "Machine learning approaches",
                                "False positive challenges"
                            ],
                            examples: ["Pattern Matching", "Statistical Analysis", "Machine Learning", "Behavioral Modeling"]
                        },
                        {
                            q: "Explain Security Monitoring tools and techniques.",
                            a: "Security monitoring involves SIEM systems, log analysis, network monitoring, vulnerability scanning, and threat intelligence integration for comprehensive security visibility.",
                            definition: "Tools and processes for continuous security monitoring",
                            keyPoints: [
                                "Continuous visibility required",
                                "Multiple data sources",
                                "Correlation and analysis",
                                "Automated response capabilities"
                            ],
                            examples: ["SIEM Platforms", "Log Management", "Network Analyzers", "Security Dashboards"]
                        },
                        {
                            q: "What is Network Access Control (NAC)? Explain its implementation.",
                            a: "NAC enforces security policies on devices attempting to access network resources, including device identification, compliance checking, and dynamic access control.",
                            definition: "Security solution controlling device access to network resources",
                            keyPoints: [
                                "Device identification and profiling",
                                "Compliance policy enforcement",
                                "Dynamic access control",
                                "Integration with security infrastructure"
                            ],
                            examples: ["Device Profiling", "Compliance Checking", "Quarantine Networks", "Remediation Workflows"]
                        }
                    ]
                },
                {
                    id: 6,
                    title: "Emerging Trends and Case Studies",
                    hours: 7,
                    questions: [
                        {
                            q: "What are Cloud Security challenges? Explain solutions and best practices.",
                            a: "Cloud security challenges include shared responsibility models, data sovereignty, access control, and compliance. Solutions involve proper configuration, encryption, monitoring, and governance frameworks.",
                            definition: "Security considerations and practices for cloud computing environments",
                            keyPoints: [
                                "Shared responsibility model understanding",
                                "Data protection and privacy",
                                "Identity and access management",
                                "Compliance and governance"
                            ],
                            examples: ["Cloud Security Posture Management", "Identity Federation", "Encryption at Rest/Transit", "Security Automation"]
                        },
                        {
                            q: "What are IoT Security threats? Explain countermeasures.",
                            a: "IoT threats include default passwords, insecure communications, weak authentication, and inadequate updates. Countermeasures involve device hardening, secure communications, and lifecycle management.",
                            definition: "Security threats targeting Internet of Things devices and mitigation strategies",
                            keyPoints: [
                                "Massive attack surface",
                                "Resource-constrained devices",
                                "Lifecycle management challenges",
                                "Privacy and data protection"
                            ],
                            examples: ["Device Hardening", "Secure Boot", "OTA Updates", "Network Segmentation"]
                        },
                        {
                            q: "How are AI and Machine Learning used in Cybersecurity?",
                            a: "AI/ML enhance cybersecurity through threat detection, behavioral analysis, automated response, and predictive analytics, but face challenges like adversarial attacks and false positives.",
                            definition: "Application of artificial intelligence and machine learning in cybersecurity",
                            keyPoints: [
                                "Enhanced threat detection capabilities",
                                "Automated security operations",
                                "Behavioral analysis and anomaly detection",
                                "Challenges with adversarial AI"
                            ],
                            examples: ["Behavioral Analytics", "Automated Incident Response", "Threat Hunting", "Predictive Security"]
                        },
                        {
                            q: "What are Blockchain Security applications?",
                            a: "Blockchain provides security applications in identity management, supply chain security, secure communications, and creating tamper-evident records through cryptographic immutability.",
                            definition: "Security applications leveraging blockchain technology's immutable characteristics",
                            keyPoints: [
                                "Immutable record keeping",
                                "Decentralized trust mechanisms",
                                "Cryptographic security",
                                "Smart contract applications"
                            ],
                            examples: ["Digital Identity", "Supply Chain Tracking", "Secure Messaging", "Certificate Management"]
                        },
                        {
                            q: "How will Quantum Computing impact Cryptography?",
                            a: "Quantum computers threaten current asymmetric cryptography (RSA, ECC) through Shor's algorithm, requiring migration to quantum-resistant cryptographic algorithms.",
                            definition: "Impact of quantum computing on current cryptographic systems",
                            keyPoints: [
                                "Threatens current public key cryptography",
                                "Timeline uncertainty creates challenges",
                                "Post-quantum cryptography development",
                                "Migration planning required"
                            ],
                            examples: ["Post-Quantum Algorithms", "Crypto Agility", "Hybrid Solutions", "Risk Assessment"]
                        },
                        {
                            q: "Analyze recent major Cyber Attacks and lessons learned.",
                            a: "Recent attacks like SolarWinds, Colonial Pipeline, and ransomware campaigns demonstrate supply chain risks, critical infrastructure vulnerabilities, and need for comprehensive incident response.",
                            definition: "Analysis of significant cybersecurity incidents and their implications",
                            keyPoints: [
                                "Supply chain attack sophistication",
                                "Critical infrastructure targeting",
                                "Ransomware evolution",
                                "Nation-state capabilities"
                            ],
                            examples: ["SolarWinds Supply Chain", "Colonial Pipeline Ransomware", "Microsoft Exchange Attacks", "Kaseya Supply Chain"]
                        },
                        {
                            q: "What is Security Automation and Orchestration?",
                            a: "SOAR (Security Orchestration, Automation, and Response) platforms automate security processes, integrate security tools, and enable rapid incident response through predefined workflows.",
                            definition: "Technologies automating and orchestrating security operations",
                            keyPoints: [
                                "Automated security workflows",
                                "Tool integration and orchestration",
                                "Faster incident response",
                                "Consistency in security operations"
                            ],
                            examples: ["Playbook Automation", "Tool Integration", "Incident Response", "Threat Intelligence Processing"]
                        },
                        {
                            q: "Explain Threat Intelligence sources and types.",
                            a: "Threat intelligence includes strategic, tactical, technical, and operational intelligence from sources like commercial feeds, government agencies, open source, and internal analysis.",
                            definition: "Information about current and potential security threats",
                            keyPoints: [
                                "Multiple intelligence types",
                                "Various source categories",
                                "Actionable intelligence focus",
                                "Integration with security tools"
                            ],
                            examples: ["IOCs", "TTPs", "Threat Actor Profiles", "Attack Campaigns"]
                        },
                        {
                            q: "What is DevSecOps and Secure Development?",
                            a: "DevSecOps integrates security throughout development lifecycle, including secure coding practices, automated security testing, and continuous security monitoring in CI/CD pipelines.",
                            definition: "Integration of security practices throughout software development lifecycle",
                            keyPoints: [
                                "Security shifted left in development",
                                "Automated security testing",
                                "Continuous security monitoring",
                                "Cultural transformation required"
                            ],
                            examples: ["SAST/DAST Tools", "Security Gates", "Container Security", "Infrastructure as Code Security"]
                        },
                        {
                            q: "What are future Cybersecurity trends and challenges?",
                            a: "Future trends include quantum-safe cryptography, AI-powered attacks and defenses, zero trust architectures, privacy-preserving technologies, and cybersecurity skills shortage challenges.",
                            definition: "Emerging trends and challenges shaping the future of cybersecurity",
                            keyPoints: [
                                "Technology evolution impact",
                                "Threat landscape changes",
                                "Skills and workforce challenges",
                                "Regulatory and compliance evolution"
                            ],
                            examples: ["Quantum Security", "AI Security", "Privacy Technology", "Skills Development"]
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
            1: ["Only protects against malware", "Focuses solely on perimeter defense", "Guarantees 100% security", "Only involves technical solutions"],
            2: ["Uses only symmetric algorithms", "Requires pre-shared keys always", "Provides only confidentiality", "Works only with digital data"],
            3: ["Single factor authentication only", "Password-only verification", "Biometrics are always required", "Works without user interaction"],
            4: ["Only encrypts data in transit", "Requires manual key exchange", "Works only with TCP", "Provides no authentication"],
            5: ["Only blocks inbound traffic", "Cannot inspect encrypted traffic", "Works only at network layer", "Requires manual configuration"],
            6: ["Only applies to traditional networks", "Eliminates all security risks", "Works without internet connectivity", "Requires specialized hardware only"]
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
            1: 'fundamentals', 2: 'cryptography', 3: 'authentication', 
            4: 'protocols', 5: 'infrastructure', 6: 'emerging'
        };
        return categoryMap[unitId] || 'general';
    }

    bindEvents() {
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Navigation events
        this.bindNavigationEvents();
        
        // Unit and content events
        this.bindUnitEvents();
        
        // Search functionality
        this.bindSearchEvents();
        
        // Tool events
        this.bindToolEvents();
    }

    bindNavigationEvents() {
        // Main navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = btn.getAttribute('data-view');
                if (view) {
                    this.showView(view);
                }
            });
        });

        // Dropdown items
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const unit = parseInt(item.getAttribute('data-unit'));
                if (unit) {
                    this.showUnit(unit);
                }
            });
        });

        // Breadcrumb navigation
        document.querySelectorAll('.breadcrumb-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view') || 'home';
                this.showView(view);
            });
        });
    }

    bindUnitEvents() {
        // Unit cards and buttons
        document.querySelectorAll('.unit-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const unit = parseInt(card.getAttribute('data-unit'));
                this.showUnit(unit);
            });
        });

        document.querySelectorAll('.unit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const unit = parseInt(btn.closest('.unit-card').getAttribute('data-unit'));
                this.showUnit(unit);
            });
        });

        // Quick access buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
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
        
        const navBtn = document.querySelector(`[data-view="${viewName}"]:not([data-unit]):not([data-tool])`);
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

        // Update unit header
        document.getElementById('currentUnit').textContent = `Unit ${unitId}`;
        document.getElementById('unitTitle').textContent = unit.title;
        document.getElementById('unitHours').textContent = `${unit.hours} hours`;

        // Update progress
        const progress = this.progress[`unit${unitId}`] || 0;
        const unitProgressFill = document.getElementById('unitProgressFill');
        const unitProgressText = document.getElementById('unitProgressText');
        
        if (unitProgressFill) {
            unitProgressFill.style.width = `${progress}%`;
        }
        if (unitProgressText) {
            unitProgressText.textContent = `${progress}% Complete`;
        }

        // Generate comprehensive unit content
        this.generateUnitContent(unit);

        // Mark as visited
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
            html += `
                <div class="qa-section fade-in">
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

    startFlashcards() {
        const categoryValue = document.getElementById('flashcardCategory').value;
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
        document.getElementById('flashcardInterface').classList.remove('hidden');
        
        this.showCurrentFlashcard();
    }

    showCurrentFlashcard() {
        const card = this.currentFlashcards[this.currentFlashcard];
        document.getElementById('flashcardFront').textContent = card.front;
        document.getElementById('flashcardBack').textContent = card.back;
        document.getElementById('cardProgress').textContent = `Card ${this.currentFlashcard + 1} of ${this.currentFlashcards.length}`;
        
        // Reset card to front
        document.getElementById('flashcardFront').classList.remove('hidden');
        document.getElementById('flashcardBack').classList.add('hidden');
    }

    flipCard() {
        const front = document.getElementById('flashcardFront');
        const back = document.getElementById('flashcardBack');
        
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
        document.getElementById('flashcardInterface').classList.add('hidden');
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'block');
    }

    startQuiz() {
        const unitValue = document.getElementById('quizUnit').value;
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
        document.getElementById('quizInterface').classList.remove('hidden');
        
        this.showCurrentQuestion();
    }

    showCurrentQuestion() {
        const question = this.currentQuizQuestions[this.currentQuestion];
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('quizProgressText').textContent = `Question ${this.currentQuestion + 1} of ${this.currentQuizQuestions.length}`;
        document.getElementById('quizScore').textContent = `Score: ${this.quizScore}/${this.currentQuestion}`;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.innerHTML = `
                <input type="radio" name="quizOption" value="${index}" id="option${index}">
                <label for="option${index}">${option}</label>
            `;
            optionDiv.addEventListener('click', () => {
                document.getElementById(`option${index}`).checked = true;
                document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                optionDiv.classList.add('selected');
            });
            optionsContainer.appendChild(optionDiv);
        });
        
        document.getElementById('submitAnswer').disabled = false;
        document.getElementById('submitAnswer').style.display = 'inline-block';
        document.getElementById('nextQuestion').style.display = 'none';
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
        
        document.getElementById('submitAnswer').style.display = 'none';
        document.getElementById('nextQuestion').style.display = 'inline-block';
        document.getElementById('quizScore').textContent = `Score: ${this.quizScore}/${this.currentQuestion + 1}`;
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
        document.getElementById('quizInterface').classList.add('hidden');
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'block');
    }

    showComparison() {
        const type = document.getElementById('comparisonType').value;
        const comparisons = {
            'algorithms': {
                title: 'Cryptographic Algorithms Comparison',
                headers: ['Algorithm', 'Type', 'Key Size', 'Status', 'Notes'],
                rows: [
                    ['DES', 'Symmetric', '56 bits', 'Deprecated', 'Vulnerable to brute force'],
                    ['AES', 'Symmetric', '128/192/256 bits', 'Current Standard', 'Fast and secure'],
                    ['RSA', 'Asymmetric', '1024/2048/4096 bits', 'Current', 'Based on prime factorization'],
                    ['ECC', 'Asymmetric', '256/384/521 bits', 'Current', 'Smaller keys, better efficiency']
                ]
            },
            'access': {
                title: 'Access Control Models Comparison',
                headers: ['Model', 'Control', 'Flexibility', 'Security', 'Use Case'],
                rows: [
                    ['DAC', 'Resource owners', 'High', 'Medium', 'Personal systems'],
                    ['MAC', 'System administrators', 'Low', 'High', 'Military/government'],
                    ['RBAC', 'Role-based', 'Medium', 'High', 'Enterprise systems']
                ]
            },
            'wireless': {
                title: 'Wireless Security Protocols Comparison',
                headers: ['Protocol', 'Year', 'Encryption', 'Key Length', 'Status'],
                rows: [
                    ['WEP', '1997', 'RC4', '40/104 bits', 'Deprecated'],
                    ['WPA', '2003', 'TKIP', '128 bits', 'Legacy'],
                    ['WPA2', '2004', 'AES-CCMP', '256 bits', 'Current'],
                    ['WPA3', '2018', 'AES-GCM', '256+ bits', 'Next-gen']
                ]
            },
            'firewall': {
                title: 'Firewall Types Comparison',
                headers: ['Type', 'State Tracking', 'Function', 'Security Level', 'Use Case'],
                rows: [
                    ['Packet Filtering', 'Stateless', 'Header-based filtering', 'Basic', 'Simple networks'],
                    ['Stateful Inspection', 'Stateful', 'Connection state tracking', 'Enhanced', 'Enterprise networks'],
                    ['Proxy-based', 'Application-aware', 'Deep packet inspection', 'High', 'High-security environments']
                ]
            },
            'detection': {
                title: 'IDS vs IPS Comparison',
                headers: ['System', 'Mode', 'Deployment', 'Function', 'Response'],
                rows: [
                    ['IDS', 'Passive', 'Out-of-band', 'Monitor and alert', 'Notification only'],
                    ['IPS', 'Active', 'Inline', 'Detect and block', 'Automatic prevention']
                ]
            }
        };
        
        const comparisonData = comparisons[type];
        
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'none');
        document.getElementById('comparisonInterface').classList.remove('hidden');
        
        const content = document.getElementById('comparisonContent');
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

    exitComparison() {
        document.getElementById('comparisonInterface').classList.add('hidden');
        document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'block');
    }

    showTool(toolName) {
        const toolMap = {
            'flashcards': 'startFlashcards',
            'quiz': 'startQuiz', 
            'compare': 'showComparison'
        };
        
        const toolFunction = toolMap[toolName];
        if (toolFunction) {
            setTimeout(() => {
                const element = document.getElementById(toolFunction);
                if (element) {
                    element.click();
                }
            }, 100);
        }
    }

    handleSearch(query) {
        if (query.length < 2) return;
        
        const results = [];
        query = query.toLowerCase();
        
        this.courseData.units.forEach(unit => {
            unit.questions.forEach((item, index) => {
                if (item.q.toLowerCase().includes(query) || 
                    item.a.toLowerCase().includes(query)) {
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
        // Reset search state if needed
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
        
        localStorage.setItem('ns_bookmarks', JSON.stringify(this.bookmarks));
        
        // Update UI
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
        localStorage.setItem('ns_progress', JSON.stringify(this.progress));
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
        app = new NetworkSecurityApp();
    });
} else {
    app = new NetworkSecurityApp();
}