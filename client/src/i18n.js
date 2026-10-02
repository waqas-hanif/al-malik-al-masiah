import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        services: "Services",
        projects: "Projects",
        contact: "Contact",
        quote: "Request Quote",
      },

      common: {
        whatsapp: "WhatsApp Us",
        contactPage: "Contact Page",
        exploreService: "Explore Service",
        learnMore: "Learn More",
        getQuote: "Get a Quote",
        back: "Back",
        close: "Close",
        previous: "Previous",
        next: "Next",
        submit: "Submit",
        sending: "Sending...",
        success: "Success",
        error: "Error",
      },

      home: {
        eyebrow: "Building & Infrastructure · Oman",

        heroTitle: "Building",
        heroAccent: "The Future.",
        heroEnd: "Grounded in Trust.",

        heroDescription:
          "From building and road construction to heavy equipment supply and backfilling, we support construction needs across Seeb–Muscat, Sultanate of Oman.",

        servicesButton: "Discover Our Services",

        requirementButton:
          "Discuss Your Requirement",

        buildingRoads:
          "Building & Roads",

        heavyEquipment:
          "Heavy Equipment",

        backfilling:
          "Backfilling",

        buildingDescription:
          "Construction solutions for building and road development requirements with a practical focus on site execution and project needs.",

        equipmentDescription:
          "Heavy equipment supply for demanding construction operations where suitable machinery and reliable site support are essential.",

        backfillingDescription:
          "Backfilling support for construction and site development requirements, helping prepare sites for the next stage of work.",

        constructionTag:
          "CONSTRUCTION",

        equipmentTag:
          "EQUIPMENT SUPPLY",

        siteTag:
          "SITE DEVELOPMENT",

        constructionServices:
          "Construction services",

        equipmentSupply:
          "Equipment supply",

        siteDevelopment:
          "Site development support",

        company:
          "Our Company",

        companyName:
          "AL MALIK",

        companyNameAccent:
          "AL MASIAH",

        companyType:
          "Trading & Contracting L.L.C",

        location:
          "Seeb–Muscat",

        oman:
          "Sultanate of Oman",

        callTeam:
          "Call our team",

        scroll:
          "Scroll to explore",

        whatWeDo:
          "What We Do",

        servicesTitle:
          "The right support",

        servicesTitleAccent:
          "for your next project.",

        servicesDescription:
          "Explore our core services in construction, equipment supply and backfilling, designed around practical site requirements.",

        workTogether:
          "Let's Work Together",

        requirementsTitle:
          "Let's discuss your",

        requirementsAccent:
          " requirements.",

        requirementsDescription:
          "Contact AL MALIK AL MASIAH Trading & Contracting L.L.C for enquiries about construction, heavy equipment supply and backfilling services in Oman.",

        footerDescription:
          "AL MALIK AL MASIAH Trading & Contracting L.L.C",

        allRights:
          "All rights reserved.",
      },

      servicesPage: {
        eyebrow:
          "Our Services",

        title:
          "Construction",

        titleAccent:
          "solutions that work.",

        description:
          "AL MALIK AL MASIAH Trading & Contracting L.L.C provides construction, heavy equipment supply and backfilling services in Seeb–Muscat, Sultanate of Oman.",

        buildingTitle:
          "Building & Roads",

        buildingSubtitle:
          "Construction & Infrastructure",

        buildingDescription:
          "Construction support for building and road development requirements, with a practical focus on site execution and project needs.",

        buildingFeatures: [
          "Building construction support",
          "Road construction requirements",
          "Site development activities",
          "Project-focused execution",
        ],

        equipmentTitle:
          "Heavy Equipment",

        equipmentSubtitle:
          "Equipment Supply",

        equipmentDescription:
          "Supply of heavy equipment for construction operations where suitable machinery and reliable site support are essential.",

        equipmentFeatures: [
          "Heavy construction equipment",
          "Equipment supply requirements",
          "Site machinery support",
          "Operational project needs",
        ],

        backfillingTitle:
          "Backfilling",

        backfillingSubtitle:
          "Site Development",

        backfillingDescription:
          "Backfilling support for construction and site development requirements, helping prepare sites for the next stage of work.",

        backfillingFeatures: [
          "Site preparation support",
          "Backfilling requirements",
          "Earthwork-related activities",
          "Construction site development",
        ],

        discussService:
          "Discuss This Service",

        quotationTitle:
          "Need a quotation?",

        quotationHeading:
          "Tell us what your project needs.",

        quotationDescription:
          "Contact our team directly for construction, equipment supply or backfilling requirements.",
      },

      projectsPage: {
        eyebrow:
          "Project Portfolio",

        title:
          "Work that speaks",

        titleAccent:
          "for itself.",

        description:
          "Explore construction, infrastructure, equipment and site development work associated with AL MALIK AL MASIAH Trading & Contracting L.L.C.",

        selectedWork:
          "Selected Work",

        showcase:
          "Our project showcase",

        projectsLabel:
          "Projects",

        filters: {
          all: "All",
          building: "Building",
          roads: "Roads",
          equipment: "Equipment",
          backfilling: "Backfilling",
        },

        items: {
          buildingConstruction: {
            title:
              "Building Construction",
            category: "Building",
            location:
              "Seeb, Oman",
            description:
              "Construction and site development support for building projects.",
          },

          roadInfrastructure: {
            title:
              "Road Infrastructure",
            category: "Roads",
            location:
              "Muscat, Oman",
            description:
              "Road construction and infrastructure-related site activities.",
          },

          heavyEquipment: {
            title:
              "Heavy Equipment Operations",
            category:
              "Equipment",
            location:
              "Muscat, Oman",
            description:
              "Heavy equipment supply and machinery support for construction operations.",
          },

          siteDevelopment: {
            title:
              "Site Development",
            category:
              "Backfilling",
            location:
              "Seeb, Oman",
            description:
              "Backfilling and earthwork-related site development activities.",
          },

          infrastructureWorks: {
            title:
              "Infrastructure Works",
            category: "Roads",
            location:
              "Muscat, Oman",
            description:
              "Infrastructure support with a focus on practical site execution.",
          },

          constructionMachinery: {
            title:
              "Construction Machinery",
            category:
              "Equipment",
            location:
              "Oman",
            description:
              "Construction machinery and equipment support for project requirements.",
          },
        },

        closePreview:
          "Close project preview",

        previousProject:
          "Previous project",

        nextProject:
          "Next project",

        projectDetails:
          "Project Details",
      },

      contactPage: {
        eyebrow:
          "Contact",

        title:
          "Let's build",

        titleAccent:
          "something solid.",

        description:
          "Have a construction, equipment supply or backfilling requirement? Contact AL MALIK AL MASIAH Trading & Contracting L.L.C directly.",

        getInTouch:
          "GET IN TOUCH",

        heading:
          "Speak directly with our team.",

        subheading:
          "For project discussions, quotations, equipment requirements or general business enquiries, use any of the contact options below.",

        callUs:
          "Call Us",

        alternative:
          "Alternative",

        email:
          "Email",

        location:
          "Location",

        chatWhatsapp:
          "Chat on WhatsApp",

        projectEnquiry:
          "Project Enquiry",

        formHeading:
          "Tell us about your requirement.",

        name:
          "Name",

        phone:
          "Phone",

        service:
          "Service",

        message:
          "Message",

        namePlaceholder:
          "Your name",

        phonePlaceholder:
          "+968 ...",

        emailPlaceholder:
          "you@example.com",

        messagePlaceholder:
          "Tell us about your project...",

        selectService:
          "Select a service",

        generalEnquiry:
          "General Enquiry",

        sendEnquiry:
          "Send Enquiry",

        formNote:
          "Your enquiry will be sent directly to our team.",

        company:
          "Company",

        managingDirector:
          "Managing Director",

        crNumber:
          "CR No.",

        poDetails:
          "P.O. Details",

        poBox:
          "P.O. Box 1558",

        poCode:
          "P.O. Code 121",
      },

      quotePage: {
        eyebrow:
          "Project Enquiry",

        title:
          "Request a",

        titleAccent:
          "Quotation.",

        description:
          "Tell us about your project requirements and our team will review your request.",

        formTitle:
          "Project Details",

        formDescription:
          "Provide accurate information so our team can understand your requirements.",

        name:
          "Full Name",

        email:
          "Email Address",

        phone:
          "Phone Number",

        company:
          "Company",

        projectType:
          "Project Type",

        projectLocation:
          "Project Location",

        budget:
          "Estimated Budget",

        expectedStartDate:
          "Expected Start Date",

        projectDescription:
          "Project Description",

        namePlaceholder:
          "Enter your full name",

        emailPlaceholder:
          "Enter your email",

        phonePlaceholder:
          "+968 ...",

        companyPlaceholder:
          "Company name (optional)",

        projectLocationPlaceholder:
          "Where is the project located?",

        budgetPlaceholder:
          "Estimated budget (optional)",

        descriptionPlaceholder:
          "Describe your project requirements...",

        selectProjectType:
          "Select project type",

        building:
          "Building & Roads",

        equipment:
          "Heavy Equipment",

        backfilling:
          "Backfilling",

        other:
          "Other",

        submit:
          "Submit Quote Request",

        submitting:
          "Submitting Request...",

        successTitle:
          "Request Submitted",

        successMessage:
          "Your quotation request has been received. Our team will review your requirements and contact you.",

        errorTitle:
          "Submission Failed",

        required:
          "This field is required.",

        minDescription:
          "Please provide at least 20 characters describing your project.",
      },
      admin: {
  nav: {
    dashboard: "Dashboard",
    quotes: "Quotes",
    messages: "Messages",
    settings: "Settings",
    logout: "Logout",
  },

  login: {
    eyebrow: "Restricted Area",
    title: "Admin",
    titleAccent: "Control Center.",
    description:
      "Sign in to manage quotation requests, customer messages and company settings.",
    email: "Email Address",
    password: "Password",
    emailPlaceholder: "admin@example.com",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    signingIn: "Signing In...",
    secure: "Authorized personnel only",
    invalid:
      "Invalid email or password. Please try again.",
  },

  dashboard: {
    eyebrow: "Control Center",
    title: "Admin Dashboard",
    welcome: "Welcome back",
    subtitle:
      "Monitor enquiries, quotation requests and incoming customer communication.",
    refresh: "Refresh",
    overview: "Overview",
    totalQuotes: "Total Quotes",
    newQuotes: "New Quotes",
    totalMessages: "Total Messages",
    newMessages: "New Messages",
    recentQuotes: "Recent Quotes",
    recentMessages: "Recent Messages",
    noQuotes: "No quotation requests yet.",
    noMessages: "No messages yet.",
    customer: "Customer",
    project: "Project",
    status: "Status",
    date: "Date",
    viewAll: "View All",
    quickAccess: "Quick Access",
    manageQuotes: "Manage Quotes",
    manageQuotesText:
      "Review and update quotation requests.",
    manageMessages: "Manage Messages",
    manageMessagesText:
      "Review customer enquiries and messages.",
    settings: "Account Settings",
    settingsText:
      "Manage your account and password.",
    aiTitle: "AI Assistant",
    aiText:
      "Your intelligent admin assistant will be available here in the next phase.",
    comingSoon: "Coming Soon",
    loading: "Loading dashboard...",
  },

  quotes: {
    eyebrow: "Management",
    title: "Quotation Requests",
    subtitle:
      "Review, update and manage customer quotation requests.",
    refresh: "Refresh",
    search: "Search",
    searchPlaceholder:
      "Search by name, email, project or location...",
    filter: "Filter Status",
    all: "All",
    customer: "Customer",
    projectType: "Project Type",
    location: "Location",
    phone: "Phone",
    status: "Status",
    date: "Date",
    actions: "Actions",
    update: "Update",
    delete: "Delete",
    details: "Details",
    noResults:
      "No quotation requests found.",
    deleteConfirm:
      "Are you sure you want to delete this quotation request?",
    loading: "Loading quotation requests...",
    updated: "Quotation status updated.",
    deleted: "Quotation request deleted.",
    error:
      "Something went wrong. Please try again.",
  },

  messages: {
    eyebrow: "Communication",
    title: "Customer Messages",
    subtitle:
      "Review and manage incoming customer enquiries.",
    refresh: "Refresh",
    search: "Search",
    searchPlaceholder:
      "Search by name, email, company or subject...",
    filter: "Filter Status",
    all: "All",
    name: "Name",
    email: "Email",
    company: "Company",
    subject: "Subject",
    status: "Status",
    date: "Date",
    actions: "Actions",
    update: "Update",
    delete: "Delete",
    details: "Details",
    noResults:
      "No customer messages found.",
    deleteConfirm:
      "Are you sure you want to delete this message?",
    loading: "Loading messages...",
    updated: "Message status updated.",
    deleted: "Message deleted.",
    error:
      "Something went wrong. Please try again.",
  },

  settings: {
    eyebrow: "Administration",
    title: "Account Settings",
    subtitle:
      "Manage your administrator account and security settings.",
    backDashboard: "Back to Dashboard",
    account: "Account Information",
    name: "Name",
    email: "Email",
    role: "Role",
    status: "Status",
    active: "Active",
    security: "Security",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    currentPlaceholder:
      "Enter current password",
    newPlaceholder:
      "Enter new password",
    confirmPlaceholder:
      "Confirm new password",
    changePassword: "Change Password",
    changing: "Changing Password...",
    show: "Show",
    hide: "Hide",
    passwordMismatch:
      "New passwords do not match.",
    passwordUpdated:
      "Password updated successfully.",
    passwordError:
      "Unable to update password.",
    accountError:
      "Unable to load account information.",
  },

  status: {
    new: "New",
    read: "Read",
    replied: "Replied",
    closed: "Closed",
    reviewing: "Reviewing",
    quoted: "Quoted",
    approved: "Approved",
    rejected: "Rejected",
  },
},
    },
  },

  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        services: "الخدمات",
        projects: "المشاريع",
        contact: "اتصل بنا",
        quote: "طلب عرض سعر",
      },

      common: {
        whatsapp: "تواصل عبر واتساب",
        contactPage: "صفحة التواصل",
        exploreService: "استكشف الخدمة",
        learnMore: "اعرف المزيد",
        getQuote: "احصل على عرض سعر",
        back: "رجوع",
        close: "إغلاق",
        previous: "السابق",
        next: "التالي",
        submit: "إرسال",
        sending: "جارٍ الإرسال...",
        success: "نجاح",
        error: "خطأ",
      },

      home: {
        eyebrow:
          "المباني والبنية التحتية · عُمان",

        heroTitle:
          "نبني",

        heroAccent:
          "المستقبل.",

        heroEnd:
          "ونرسخ الثقة.",

        heroDescription:
          "من إنشاء المباني والطرق إلى توريد المعدات الثقيلة وأعمال الردم، ندعم احتياجات مشاريع الإنشاء في السيب–مسقط، سلطنة عُمان.",

        servicesButton:
          "اكتشف خدماتنا",

        requirementButton:
          "ناقش متطلباتك",

        buildingRoads:
          "المباني والطرق",

        heavyEquipment:
          "المعدات الثقيلة",

        backfilling:
          "أعمال الردم",

        buildingDescription:
          "حلول إنشائية لمتطلبات المباني وتطوير الطرق مع التركيز العملي على تنفيذ الأعمال واحتياجات المشروع.",

        equipmentDescription:
          "توريد المعدات الثقيلة لعمليات الإنشاء التي تتطلب الآلات المناسبة والدعم الموثوق في الموقع.",

        backfillingDescription:
          "دعم أعمال الردم وتجهيز المواقع لمتطلبات الإنشاء وتطوير المواقع استعداداً للمراحل التالية من العمل.",

        constructionTag:
          "الإنشاءات",

        equipmentTag:
          "توريد المعدات",

        siteTag:
          "تطوير المواقع",

        constructionServices:
          "خدمات الإنشاء",

        equipmentSupply:
          "توريد المعدات",

        siteDevelopment:
          "دعم تطوير المواقع",

        company:
          "شركتنا",

        companyName:
          "AL MALIK",

        companyNameAccent:
          "AL MASIAH",

        companyType:
          "للتجارة والمقاولات ش.ذ.م.م",

        location:
          "السيب – مسقط",

        oman:
          "سلطنة عُمان",

        callTeam:
          "اتصل بفريقنا",

        scroll:
          "مرر للاستكشاف",

        whatWeDo:
          "ما نقدمه",

        servicesTitle:
          "الدعم المناسب",

        servicesTitleAccent:
          "لمشروعك القادم.",

        servicesDescription:
          "استكشف خدماتنا الأساسية في الإنشاءات وتوريد المعدات وأعمال الردم، والمصممة وفق احتياجات المواقع والمشاريع العملية.",

        workTogether:
          "لنعمل معاً",

        requirementsTitle:
          "لنتحدث عن",

        requirementsAccent:
          " متطلباتك.",

        requirementsDescription:
          "تواصل مع AL MALIK AL MASIAH Trading & Contracting L.L.C للاستفسارات المتعلقة بالإنشاءات وتوريد المعدات الثقيلة وأعمال الردم في عُمان.",

        footerDescription:
          "AL MALIK AL MASIAH Trading & Contracting L.L.C",

        allRights:
          "جميع الحقوق محفوظة.",
      },

      servicesPage: {
        eyebrow:
          "خدماتنا",

        title:
          "حلول",

        titleAccent:
          "إنشائية فعّالة.",

        description:
          "تقدم AL MALIK AL MASIAH Trading & Contracting L.L.C خدمات الإنشاءات وتوريد المعدات الثقيلة وأعمال الردم في السيب–مسقط، سلطنة عُمان.",

        buildingTitle:
          "المباني والطرق",

        buildingSubtitle:
          "الإنشاءات والبنية التحتية",

        buildingDescription:
          "دعم إنشائي لمتطلبات إنشاء المباني وتطوير الطرق مع التركيز العملي على تنفيذ الأعمال واحتياجات المشروع.",

        buildingFeatures: [
          "دعم أعمال إنشاء المباني",
          "متطلبات إنشاء الطرق",
          "أعمال تطوير المواقع",
          "تنفيذ يركز على احتياجات المشروع",
        ],

        equipmentTitle:
          "المعدات الثقيلة",

        equipmentSubtitle:
          "توريد المعدات",

        equipmentDescription:
          "توريد المعدات الثقيلة لعمليات الإنشاء التي تتطلب آلات مناسبة ودعماً موثوقاً في الموقع.",

        equipmentFeatures: [
          "معدات الإنشاءات الثقيلة",
          "متطلبات توريد المعدات",
          "دعم آلات الموقع",
          "الاحتياجات التشغيلية للمشاريع",
        ],

        backfillingTitle:
          "أعمال الردم",

        backfillingSubtitle:
          "تطوير المواقع",

        backfillingDescription:
          "دعم أعمال الردم وتجهيز المواقع لمتطلبات الإنشاء وتطوير المواقع استعداداً للمرحلة التالية من العمل.",

        backfillingFeatures: [
          "دعم تجهيز المواقع",
          "متطلبات أعمال الردم",
          "أنشطة الأعمال الترابية",
          "تطوير مواقع الإنشاء",
        ],

        discussService:
          "ناقش هذه الخدمة",

        quotationTitle:
          "هل تحتاج إلى عرض سعر؟",

        quotationHeading:
          "أخبرنا باحتياجات مشروعك.",

        quotationDescription:
          "تواصل مباشرة مع فريقنا لمتطلبات الإنشاء أو توريد المعدات أو أعمال الردم.",
      },

      projectsPage: {
        eyebrow:
          "محفظة المشاريع",

        title:
          "أعمال تتحدث",

        titleAccent:
          "عن نفسها.",

        description:
          "استكشف أعمال الإنشاء والبنية التحتية والمعدات وتطوير المواقع المرتبطة بـ AL MALIK AL MASIAH Trading & Contracting L.L.C.",

        selectedWork:
          "أعمال مختارة",

        showcase:
          "معرض مشاريعنا",

        projectsLabel:
          "المشاريع",

        filters: {
          all: "الكل",
          building: "المباني",
          roads: "الطرق",
          equipment: "المعدات",
          backfilling: "الردم",
        },

        items: {
          buildingConstruction: {
            title:
              "إنشاء المباني",
            category: "المباني",
            location:
              "السيب، عُمان",
            description:
              "دعم أعمال الإنشاء وتطوير المواقع لمشاريع المباني.",
          },

          roadInfrastructure: {
            title:
              "البنية التحتية للطرق",
            category: "الطرق",
            location:
              "مسقط، عُمان",
            description:
              "أعمال إنشاء الطرق والأنشطة المرتبطة بالبنية التحتية للمواقع.",
          },

          heavyEquipment: {
            title:
              "عمليات المعدات الثقيلة",
            category:
              "المعدات",
            location:
              "مسقط، عُمان",
            description:
              "توريد المعدات الثقيلة ودعم الآلات لعمليات الإنشاء.",
          },

          siteDevelopment: {
            title:
              "تطوير المواقع",
            category:
              "الردم",
            location:
              "السيب، عُمان",
            description:
              "أعمال الردم والأنشطة المرتبطة بالأعمال الترابية وتطوير المواقع.",
          },

          infrastructureWorks: {
            title:
              "أعمال البنية التحتية",
            category: "الطرق",
            location:
              "مسقط، عُمان",
            description:
              "دعم البنية التحتية مع التركيز على التنفيذ العملي في المواقع.",
          },

          constructionMachinery: {
            title:
              "آلات الإنشاءات",
            category:
              "المعدات",
            location:
              "عُمان",
            description:
              "دعم آلات ومعدات الإنشاء لمتطلبات المشاريع.",
          },
        },

        closePreview:
          "إغلاق معاينة المشروع",

        previousProject:
          "المشروع السابق",

        nextProject:
          "المشروع التالي",

        projectDetails:
          "تفاصيل المشروع",
      },

      contactPage: {
        eyebrow:
          "اتصل بنا",

        title:
          "لنبنِ",

        titleAccent:
          "شيئاً متيناً.",

        description:
          "لديك متطلب يتعلق بالإنشاءات أو توريد المعدات أو أعمال الردم؟ تواصل مباشرة مع AL MALIK AL MASIAH Trading & Contracting L.L.C.",

        getInTouch:
          "تواصل معنا",

        heading:
          "تحدث مباشرة مع فريقنا.",

        subheading:
          "لمناقشة المشاريع أو طلبات عروض الأسعار أو متطلبات المعدات أو الاستفسارات التجارية العامة، استخدم أي من خيارات التواصل التالية.",

        callUs:
          "اتصل بنا",

        alternative:
          "رقم بديل",

        email:
          "البريد الإلكتروني",

        location:
          "الموقع",

        chatWhatsapp:
          "تواصل عبر واتساب",

        projectEnquiry:
          "استفسار عن مشروع",

        formHeading:
          "أخبرنا عن متطلباتك.",

        name:
          "الاسم",

        phone:
          "رقم الهاتف",

        service:
          "الخدمة",

        message:
          "الرسالة",

        namePlaceholder:
          "اسمك",

        phonePlaceholder:
          "+968 ...",

        emailPlaceholder:
          "you@example.com",

        messagePlaceholder:
          "أخبرنا عن مشروعك...",

        selectService:
          "اختر الخدمة",

        generalEnquiry:
          "استفسار عام",

        sendEnquiry:
          "إرسال الاستفسار",

        formNote:
          "سيتم إرسال استفسارك مباشرة إلى فريقنا.",

        company:
          "الشركة",

        managingDirector:
          "المدير العام",

        crNumber:
          "رقم السجل التجاري",

        poDetails:
          "تفاصيل صندوق البريد",

        poBox:
          "ص.ب 1558",

        poCode:
          "الرمز البريدي 121",
      },

      quotePage: {
        eyebrow:
          "استفسار عن مشروع",

        title:
          "اطلب",

        titleAccent:
          "عرض سعر.",

        description:
          "أخبرنا عن متطلبات مشروعك وسيقوم فريقنا بمراجعة طلبك.",

        formTitle:
          "تفاصيل المشروع",

        formDescription:
          "قدّم معلومات دقيقة حتى يتمكن فريقنا من فهم متطلباتك.",

        name:
          "الاسم الكامل",

        email:
          "البريد الإلكتروني",

        phone:
          "رقم الهاتف",

        company:
          "الشركة",

        projectType:
          "نوع المشروع",

        projectLocation:
          "موقع المشروع",

        budget:
          "الميزانية التقديرية",

        expectedStartDate:
          "تاريخ البدء المتوقع",

        projectDescription:
          "وصف المشروع",

        namePlaceholder:
          "أدخل اسمك الكامل",

        emailPlaceholder:
          "أدخل بريدك الإلكتروني",

        phonePlaceholder:
          "+968 ...",

        companyPlaceholder:
          "اسم الشركة (اختياري)",

        projectLocationPlaceholder:
          "أين يقع المشروع؟",

        budgetPlaceholder:
          "الميزانية التقديرية (اختياري)",

        descriptionPlaceholder:
          "صف متطلبات مشروعك...",

        selectProjectType:
          "اختر نوع المشروع",

        building:
          "المباني والطرق",

        equipment:
          "المعدات الثقيلة",

        backfilling:
          "أعمال الردم",

        other:
          "أخرى",

        submit:
          "إرسال طلب عرض السعر",

        submitting:
          "جارٍ إرسال الطلب...",

        successTitle:
          "تم إرسال الطلب",

        successMessage:
          "تم استلام طلب عرض السعر بنجاح. سيقوم فريقنا بمراجعة متطلباتك والتواصل معك.",

        errorTitle:
          "فشل الإرسال",

        required:
          "هذا الحقل مطلوب.",

        minDescription:
          "يرجى كتابة 20 حرفاً على الأقل لوصف مشروعك.",
      },
      admin: {
  nav: {
    dashboard: "لوحة التحكم",
    quotes: "عروض الأسعار",
    messages: "الرسائل",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
  },

  login: {
    eyebrow: "منطقة محمية",
    title: "لوحة",
    titleAccent: "تحكم الإدارة.",
    description:
      "سجّل الدخول لإدارة طلبات عروض الأسعار ورسائل العملاء وإعدادات الشركة.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    emailPlaceholder: "admin@example.com",
    passwordPlaceholder: "أدخل كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جارٍ تسجيل الدخول...",
    secure: "للمستخدمين المصرح لهم فقط",
    invalid:
      "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
  },

  dashboard: {
    eyebrow: "مركز التحكم",
    title: "لوحة تحكم الإدارة",
    welcome: "مرحباً بعودتك",
    subtitle:
      "راقب الاستفسارات وطلبات عروض الأسعار ورسائل العملاء الواردة.",
    refresh: "تحديث",
    overview: "نظرة عامة",
    totalQuotes: "إجمالي عروض الأسعار",
    newQuotes: "العروض الجديدة",
    totalMessages: "إجمالي الرسائل",
    newMessages: "الرسائل الجديدة",
    recentQuotes: "أحدث طلبات الأسعار",
    recentMessages: "أحدث الرسائل",
    noQuotes: "لا توجد طلبات عروض أسعار حالياً.",
    noMessages: "لا توجد رسائل حالياً.",
    customer: "العميل",
    project: "المشروع",
    status: "الحالة",
    date: "التاريخ",
    viewAll: "عرض الكل",
    quickAccess: "الوصول السريع",
    manageQuotes: "إدارة عروض الأسعار",
    manageQuotesText:
      "مراجعة وتحديث طلبات عروض الأسعار.",
    manageMessages: "إدارة الرسائل",
    manageMessagesText:
      "مراجعة استفسارات ورسائل العملاء.",
    settings: "إعدادات الحساب",
    settingsText:
      "إدارة الحساب وكلمة المرور.",
    aiTitle: "المساعد الذكي",
    aiText:
      "سيكون المساعد الذكي متاحاً هنا في المرحلة القادمة.",
    comingSoon: "قريباً",
    loading: "جارٍ تحميل لوحة التحكم...",
  },

  quotes: {
    eyebrow: "الإدارة",
    title: "طلبات عروض الأسعار",
    subtitle:
      "مراجعة وتحديث وإدارة طلبات عروض الأسعار الواردة من العملاء.",
    refresh: "تحديث",
    search: "بحث",
    searchPlaceholder:
      "ابحث بالاسم أو البريد أو المشروع أو الموقع...",
    filter: "تصفية حسب الحالة",
    all: "الكل",
    customer: "العميل",
    projectType: "نوع المشروع",
    location: "الموقع",
    phone: "الهاتف",
    status: "الحالة",
    date: "التاريخ",
    actions: "الإجراءات",
    update: "تحديث",
    delete: "حذف",
    details: "التفاصيل",
    noResults:
      "لم يتم العثور على طلبات عروض أسعار.",
    deleteConfirm:
      "هل أنت متأكد من حذف طلب عرض السعر هذا؟",
    loading: "جارٍ تحميل طلبات عروض الأسعار...",
    updated: "تم تحديث حالة عرض السعر.",
    deleted: "تم حذف طلب عرض السعر.",
    error:
      "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },

  messages: {
    eyebrow: "التواصل",
    title: "رسائل العملاء",
    subtitle:
      "مراجعة وإدارة استفسارات العملاء الواردة.",
    refresh: "تحديث",
    search: "بحث",
    searchPlaceholder:
      "ابحث بالاسم أو البريد أو الشركة أو الموضوع...",
    filter: "تصفية حسب الحالة",
    all: "الكل",
    name: "الاسم",
    email: "البريد الإلكتروني",
    company: "الشركة",
    subject: "الموضوع",
    status: "الحالة",
    date: "التاريخ",
    actions: "الإجراءات",
    update: "تحديث",
    delete: "حذف",
    details: "التفاصيل",
    noResults:
      "لم يتم العثور على رسائل عملاء.",
    deleteConfirm:
      "هل أنت متأكد من حذف هذه الرسالة؟",
    loading: "جارٍ تحميل الرسائل...",
    updated: "تم تحديث حالة الرسالة.",
    deleted: "تم حذف الرسالة.",
    error:
      "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },

  settings: {
    eyebrow: "الإدارة",
    title: "إعدادات الحساب",
    subtitle:
      "إدارة حساب المسؤول وإعدادات الأمان.",
    backDashboard: "العودة إلى لوحة التحكم",
    account: "معلومات الحساب",
    name: "الاسم",
    email: "البريد الإلكتروني",
    role: "الدور",
    status: "الحالة",
    active: "نشط",
    security: "الأمان",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور الجديدة",
    currentPlaceholder:
      "أدخل كلمة المرور الحالية",
    newPlaceholder:
      "أدخل كلمة المرور الجديدة",
    confirmPlaceholder:
      "أكد كلمة المرور الجديدة",
    changePassword: "تغيير كلمة المرور",
    changing: "جارٍ تغيير كلمة المرور...",
    show: "إظهار",
    hide: "إخفاء",
    passwordMismatch:
      "كلمتا المرور الجديدتان غير متطابقتين.",
    passwordUpdated:
      "تم تحديث كلمة المرور بنجاح.",
    passwordError:
      "تعذر تحديث كلمة المرور.",
    accountError:
      "تعذر تحميل معلومات الحساب.",
  },

  status: {
    new: "جديد",
    read: "مقروء",
    replied: "تم الرد",
    closed: "مغلق",
    reviewing: "قيد المراجعة",
    quoted: "تم تقديم العرض",
    approved: "تمت الموافقة",
    rejected: "مرفوض",
  },
},
    },
  },
};

const savedLanguage =
  localStorage.getItem("language") || "en";

const initialLanguage =
  savedLanguage === "ar" ? "ar" : "en";

const applyDirection = (language) => {
  const isArabic = language === "ar";

  document.documentElement.lang = isArabic
    ? "ar"
    : "en";

  document.documentElement.dir = isArabic
    ? "rtl"
    : "ltr";

  document.body.dir = isArabic
    ? "rtl"
    : "ltr";
};

applyDirection(initialLanguage);

i18n.on("languageChanged", (language) => {
  applyDirection(language);

  localStorage.setItem(
    "language",
    language
  );
});

i18n
  .use(initReactI18next)
  .init({
    resources,

    lng: initialLanguage,

    fallbackLng: "en",

    supportedLngs: ["en", "ar"],

    interpolation: {
      escapeValue: false,
    },

    returnEmptyString: false,

    debug: false,
  });

export default i18n;