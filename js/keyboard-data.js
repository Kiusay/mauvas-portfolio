/**
 * Keyboard Skills Data
 * Dataset editable con todas las teclas del teclado interactivo
 * Layout actualizado para parecer más a un teclado real
 */

const KEYBOARD_DATA = {
    // Configuración de filas del teclado con tamaños reales
    rows: [
        // Fila 0: Teclas de función (ESC + F-keys style)
        {
            id: 'function-row',
            keys: ['ESC', 'LANG', 'MODE', 'RESET', 'CV']
        },
        // Fila 1: Números/Frontend (con teclas de tamaño normal)
        {
            id: 'number-row',
            keys: ['HTML', 'CSS', 'JS', 'TS', 'REACT', 'NEXT', 'VITE', 'TAILWIND', 'A11Y', 'PERF', 'BACKSPACE']
        },
        // Fila 2: QWERTY/Backend
        {
            id: 'qwerty-row',
            keys: ['TAB', 'NODE', 'EXPRESS', 'REST', 'GRAPHQL', 'AUTH', 'WEBSOCKETS', 'API', 'CLEAN', 'PATTERNS', 'DOCS']
        },
        // Fila 3: ASDF/Database
        {
            id: 'home-row',
            keys: ['CAPSLOCK', 'POSTGRESQL', 'SQL', 'PRISMA', 'MONGODB', 'REDIS', 'INDEXING', 'MODELING', 'CACHE', 'ENTER']
        },
        // Fila 4: ZXCV/DevOps
        {
            id: 'bottom-row',
            keys: ['SHIFT_L', 'GIT', 'GITHUB', 'DOCKER', 'CICD', 'LINUX', 'NGINX', 'AWS', 'S3', 'EC2', 'SHIFT_R']
        },
        // Fila 5: Spacebar row
        {
            id: 'space-row',
            keys: ['CTRL', 'ALT', 'SPACE', 'ALTGR', 'FN']
        }
    ],

    // Detalles de cada tecla
    keys: {
        // === TECLAS ESPECIALES (Fila 0 - Function keys) ===
        'ESC': {
            label: 'ESC',
            fullName: { es: 'Escape', en: 'Escape' },
            category: 'special',
            isSpecial: true,
            size: 'normal',
            action: 'reset',
            description: {
                es: 'Reiniciar vista y deseleccionar tecla activa',
                en: 'Reset view and deselect active key'
            }
        },
        'LANG': {
            label: 'LANG',
            fullName: { es: 'Idioma', en: 'Language' },
            category: 'special',
            isSpecial: true,
            size: 'normal',
            action: 'toggleLang',
            description: {
                es: 'Cambiar entre Español e Inglés',
                en: 'Switch between Spanish and English'
            }
        },
        'MODE': {
            label: 'MODE',
            fullName: { es: 'Modo', en: 'Mode' },
            category: 'special',
            isSpecial: true,
            size: 'normal',
            action: 'cycleFilter',
            description: {
                es: 'Cambiar filtro de categorías',
                en: 'Cycle through category filters'
            }
        },
        'RESET': {
            label: 'RESET',
            fullName: { es: 'Reiniciar', en: 'Reset' },
            category: 'special',
            isSpecial: true,
            size: 'normal',
            action: 'resetAll',
            description: {
                es: 'Reiniciar todos los filtros y selecciones',
                en: 'Reset all filters and selections'
            }
        },
        'CV': {
            label: 'CV',
            fullName: { es: 'Currículum', en: 'Resume' },
            category: 'special',
            isSpecial: true,
            size: 'normal',
            action: 'openCV',
            description: {
                es: 'Descargar mi currículum vitae',
                en: 'Download my resume'
            }
        },

        // === FRONTEND (Fila 1 - Number row) ===
        'HTML': {
            label: 'HTML',
            fullName: { es: 'HTML5', en: 'HTML5' },
            category: 'frontend',
            level: 5,
            years: 5,
            icon: './assets/icons/html5.svg',
            description: {
                es: 'Estructura semántica, SEO, accesibilidad y mejores prácticas web',
                en: 'Semantic structure, SEO, accessibility and web best practices'
            },
            projects: ['Portfolio', 'E-commerce']
        },
        'CSS': {
            label: 'CSS',
            fullName: { es: 'CSS3', en: 'CSS3' },
            category: 'frontend',
            level: 5,
            years: 5,
            icon: './assets/icons/css3.svg',
            description: {
                es: 'Layouts modernos, animaciones, responsive design y CSS-in-JS',
                en: 'Modern layouts, animations, responsive design and CSS-in-JS'
            },
            projects: ['Portfolio', 'Dashboard']
        },
        'JS': {
            label: 'JS',
            fullName: { es: 'JavaScript', en: 'JavaScript' },
            category: 'frontend',
            level: 4,
            years: 5,
            icon: './assets/icons/javascript.svg',
            description: {
                es: 'ES6+, DOM manipulation, APIs del navegador, programación funcional',
                en: 'ES6+, DOM manipulation, browser APIs, functional programming'
            },
            projects: ['Portfolio', 'Apps', 'Games']
        },
        'TS': {
            label: 'TS',
            fullName: { es: 'TypeScript', en: 'TypeScript' },
            category: 'frontend',
            level: 3,
            years: 3,
            icon: './assets/icons/typescript.svg',
            description: {
                es: 'Tipado estático, interfaces, generics. Refactorizo sin miedo',
                en: 'Static typing, interfaces, generics. Refactor without fear'
            },
            projects: ['Enterprise Apps']
        },
        'REACT': {
            label: 'React',
            fullName: { es: 'React', en: 'React' },
            category: 'frontend',
            level: 4,
            years: 4,
            icon: './assets/icons/react.svg',
            description: {
                es: 'Hooks, Context, componentes reutilizables, state management',
                en: 'Hooks, Context, reusable components, state management'
            },
            projects: ['Dashboard', 'E-commerce', 'Portfolio']
        },
        'NEXT': {
            label: 'Next',
            fullName: { es: 'Next.js', en: 'Next.js' },
            category: 'frontend',
            level: 3,
            years: 2,
            icon: './assets/icons/nextjs.svg',
            description: {
                es: 'SSR, SSG, API routes, optimización automática de imágenes',
                en: 'SSR, SSG, API routes, automatic image optimization'
            },
            projects: ['Blog', 'Landing Pages']
        },
        'VITE': {
            label: 'Vite',
            fullName: { es: 'Vite', en: 'Vite' },
            category: 'frontend',
            level: 4,
            years: 2,
            icon: './assets/icons/vite.svg',
            description: {
                es: 'Bundler ultrarrápido, HMR instantáneo, configuración simple',
                en: 'Ultra-fast bundler, instant HMR, simple configuration'
            },
            projects: ['Modern SPAs']
        },
        'TAILWIND': {
            label: 'Tail',
            fullName: { es: 'Tailwind CSS', en: 'Tailwind CSS' },
            category: 'frontend',
            level: 4,
            years: 2,
            icon: './assets/icons/tailwind.svg',
            description: {
                es: 'Utility-first CSS, diseño rápido y consistente',
                en: 'Utility-first CSS, rapid and consistent design'
            },
            projects: ['Dashboard', 'Landing Pages']
        },
        'A11Y': {
            label: 'A11y',
            fullName: { es: 'Accesibilidad', en: 'Accessibility' },
            category: 'frontend',
            level: 3,
            years: 3,
            icon: './assets/icons/a11y-w3c.svg',
            description: {
                es: 'WCAG, ARIA, diseño inclusivo, lectores de pantalla',
                en: 'WCAG, ARIA, inclusive design, screen readers'
            },
            projects: ['All Projects']
        },
        'PERF': {
            label: 'Perf',
            fullName: { es: 'Performance', en: 'Performance' },
            category: 'frontend',
            level: 3,
            years: 3,
            icon: './assets/icons/performance.svg',
            description: {
                es: 'Core Web Vitals, Lighthouse, lazy loading, code splitting',
                en: 'Core Web Vitals, Lighthouse, lazy loading, code splitting'
            },
            projects: ['All Projects']
        },
        'BACKSPACE': {
            label: 'Borrar',
            fullName: { es: 'Borrar', en: 'Backspace' },
            category: 'special',
            isSpecial: true,
            size: 'wide',
            action: 'reset',
            icon: './assets/icons/clear.svg',
            description: {
                es: 'Limpiar selección actual',
                en: 'Clear current selection'
            }
        },

        // === BACKEND (Fila 2 - QWERTY row) ===
        'TAB': {
            label: 'TAB',
            fullName: { es: 'Categoría', en: 'Category' },
            category: 'special',
            isSpecial: true,
            size: 'tab',
            action: 'cycleFilter',
            description: {
                es: 'Navegar entre categorías de habilidades',
                en: 'Navigate between skill categories'
            }
        },
        'NODE': {
            label: 'Node',
            fullName: { es: 'Node.js', en: 'Node.js' },
            category: 'backend',
            level: 3,
            years: 4,
            icon: './assets/icons/nodejs.svg',
            description: {
                es: 'Runtime JS del lado servidor, APIs RESTful, microservicios',
                en: 'Server-side JS runtime, RESTful APIs, microservices'
            },
            projects: ['API Server', 'Real-time Apps']
        },
        'EXPRESS': {
            label: 'Expr',
            fullName: { es: 'Express.js', en: 'Express.js' },
            category: 'backend',
            level: 3,
            years: 4,
            icon: './assets/icons/express.svg',
            description: {
                es: 'Framework minimalista, middleware, routing avanzado',
                en: 'Minimalist framework, middleware, advanced routing'
            },
            projects: ['REST APIs']
        },
        'REST': {
            label: 'REST',
            fullName: { es: 'REST APIs', en: 'REST APIs' },
            category: 'backend',
            level: 4,
            years: 4,
            icon: './assets/icons/rest.svg',
            description: {
                es: 'Diseño RESTful, versionado, documentación con Swagger/OpenAPI',
                en: 'RESTful design, versioning, Swagger/OpenAPI documentation'
            },
            projects: ['Multiple APIs']
        },
        'GRAPHQL': {
            label: 'GQL',
            fullName: { es: 'GraphQL', en: 'GraphQL' },
            category: 'backend',
            level: 2,
            years: 2,
            icon: './assets/icons/graphql.svg',
            description: {
                es: 'Queries flexibles, schemas tipados, Apollo Server',
                en: 'Flexible queries, typed schemas, Apollo Server'
            },
            projects: ['Dashboard API']
        },
        'AUTH': {
            label: 'Auth',
            fullName: { es: 'Autenticación', en: 'Authentication' },
            category: 'backend',
            level: 3,
            years: 3,
            icon: './assets/icons/jwt.svg',
            description: {
                es: 'JWT, OAuth2, sesiones, roles y permisos',
                en: 'JWT, OAuth2, sessions, roles and permissions'
            },
            projects: ['Secure Apps']
        },
        'WEBSOCKETS': {
            label: 'WS',
            fullName: { es: 'WebSockets', en: 'WebSockets' },
            category: 'backend',
            level: 2,
            years: 2,
            icon: './assets/icons/websocket.svg',
            description: {
                es: 'Comunicación en tiempo real, Socket.io, eventos bidireccionales',
                en: 'Real-time communication, Socket.io, bidirectional events'
            },
            projects: ['Chat Apps', 'Live Updates']
        },
        'API': {
            label: 'API',
            fullName: { es: 'API Design', en: 'API Design' },
            category: 'backend',
            level: 3,
            years: 3,
            icon: './assets/icons/api.svg',
            description: {
                es: 'Diseño de APIs escalables, versionado, rate limiting',
                en: 'Scalable API design, versioning, rate limiting'
            },
            projects: ['Enterprise APIs']
        },
        'CLEAN': {
            label: 'Clean',
            fullName: { es: 'Clean Code', en: 'Clean Code' },
            category: 'backend',
            level: 3,
            years: 3,
            icon: './assets/icons/clean2.svg',
            description: {
                es: 'Código legible, SOLID, DRY, refactoring continuo',
                en: 'Readable code, SOLID, DRY, continuous refactoring'
            },
            projects: ['All Projects']
        },
        'PATTERNS': {
            label: 'Patt',
            fullName: { es: 'Design Patterns', en: 'Design Patterns' },
            category: 'backend',
            level: 2,
            years: 3,
            icon: './assets/icons/patterns2.svg',
            description: {
                es: 'Factory, Singleton, Observer, Strategy, Repository',
                en: 'Factory, Singleton, Observer, Strategy, Repository'
            },
            projects: ['Architecture']
        },
        'DOCS': {
            label: 'Docs',
            fullName: { es: 'Documentación', en: 'Documentation' },
            category: 'backend',
            level: 4,
            years: 4,
            icon: './assets/icons/docs.svg',
            description: {
                es: 'JSDoc, README, wikis técnicas, diagramas de arquitectura',
                en: 'JSDoc, README, technical wikis, architecture diagrams'
            },
            projects: ['All Projects']
        },

        // === DATABASE (Fila 3 - Home row) ===
        'CAPSLOCK': {
            label: 'CAPS',
            fullName: { es: 'Bloqueo', en: 'Caps Lock' },
            category: 'special',
            isSpecial: true,
            size: 'caps',
            action: 'toggleHighlight',
            description: {
                es: 'Resaltar habilidades principales',
                en: 'Highlight main skills'
            }
        },
        'POSTGRESQL': {
            label: 'Post',
            fullName: { es: 'PostgreSQL', en: 'PostgreSQL' },
            category: 'database',
            level: 3,
            years: 3,
            icon: './assets/icons/postgresql.svg',
            description: {
                es: 'Base de datos relacional avanzada, JSON, full-text search',
                en: 'Advanced relational database, JSON, full-text search'
            },
            projects: ['Enterprise Apps']
        },
        'SQL': {
            label: 'SQL',
            fullName: { es: 'SQL', en: 'SQL' },
            category: 'database',
            level: 4,
            years: 4,
            icon: './assets/icons/sql.svg',
            description: {
                es: 'Queries complejas, joins, subqueries, optimización',
                en: 'Complex queries, joins, subqueries, optimization'
            },
            projects: ['All Database Projects']
        },
        'PRISMA': {
            label: 'Pris',
            fullName: { es: 'Prisma', en: 'Prisma' },
            category: 'database',
            level: 3,
            years: 2,
            icon: './assets/icons/prisma.svg',
            description: {
                es: 'ORM moderno, migraciones automáticas, type-safe',
                en: 'Modern ORM, automatic migrations, type-safe'
            },
            projects: ['Next.js Apps']
        },
        'MONGODB': {
            label: 'Mongo',
            fullName: { es: 'MongoDB', en: 'MongoDB' },
            category: 'database',
            level: 3,
            years: 3,
            icon: './assets/icons/mongodb.svg',
            description: {
                es: 'NoSQL, documentos JSON, agregaciones, Atlas cloud',
                en: 'NoSQL, JSON documents, aggregations, Atlas cloud'
            },
            projects: ['Real-time Apps']
        },
        'REDIS': {
            label: 'Redis',
            fullName: { es: 'Redis', en: 'Redis' },
            category: 'database',
            level: 2,
            years: 2,
            icon: './assets/icons/redis.svg',
            description: {
                es: 'Cache en memoria, pub/sub, sesiones, rate limiting',
                en: 'In-memory cache, pub/sub, sessions, rate limiting'
            },
            projects: ['High-traffic Apps']
        },
        'INDEXING': {
            label: 'Indx',
            fullName: { es: 'Indexación', en: 'Indexing' },
            category: 'database',
            level: 2,
            years: 2,
            icon: './assets/icons/indexing2.svg',
            description: {
                es: 'Índices B-tree, optimización de queries, EXPLAIN',
                en: 'B-tree indexes, query optimization, EXPLAIN'
            },
            projects: ['Performance Tuning']
        },
        'MODELING': {
            label: 'Model',
            fullName: { es: 'Modelado', en: 'Data Modeling' },
            category: 'database',
            level: 3,
            years: 3,
            icon: './assets/icons/modeling.svg',
            description: {
                es: 'ERD, normalización, relaciones, diseño de schemas',
                en: 'ERD, normalization, relationships, schema design'
            },
            projects: ['Database Architecture']
        },
        'CACHE': {
            label: 'Cache',
            fullName: { es: 'Caching', en: 'Caching' },
            category: 'database',
            level: 3,
            years: 3,
            icon: './assets/icons/cache.svg',
            description: {
                es: 'Estrategias de cache, invalidación, CDN, HTTP caching',
                en: 'Caching strategies, invalidation, CDN, HTTP caching'
            },
            projects: ['Performance']
        },
        'ENTER': {
            label: 'ENTER',
            fullName: { es: 'Proyectos', en: 'Projects' },
            category: 'special',
            isSpecial: true,
            size: 'enter',
            action: 'goProjects',
            description: {
                es: 'Ver mis proyectos destacados',
                en: 'See my featured projects'
            }
        },

        // === DEVOPS (Fila 4 - Bottom row) ===
        'SHIFT_L': {
            label: 'SHIFT',
            fullName: { es: 'Tema', en: 'Theme' },
            category: 'special',
            isSpecial: true,
            size: 'shift',
            action: 'toggleTheme',
            description: {
                es: 'Cambiar tema visual (próximamente)',
                en: 'Toggle visual theme (coming soon)'
            }
        },
        'GIT': {
            label: 'Git',
            fullName: { es: 'Git', en: 'Git' },
            category: 'devops',
            level: 5,
            years: 5,
            icon: './assets/icons/git.svg',
            description: {
                es: 'Branching, merging, rebasing, gitflow, colaboración',
                en: 'Branching, merging, rebasing, gitflow, collaboration'
            },
            projects: ['All Projects']
        },
        'GITHUB': {
            label: 'GH',
            fullName: { es: 'GitHub', en: 'GitHub' },
            category: 'devops',
            level: 5,
            years: 5,
            icon: './assets/icons/github.svg',
            description: {
                es: 'PRs, code reviews, Actions, Issues, Projects',
                en: 'PRs, code reviews, Actions, Issues, Projects'
            },
            projects: ['All Projects']
        },
        'DOCKER': {
            label: 'Dock',
            fullName: { es: 'Docker', en: 'Docker' },
            category: 'devops',
            level: 2,
            years: 3,
            icon: './assets/icons/docker.svg',
            description: {
                es: 'Containers, Compose, imágenes optimizadas, multi-stage',
                en: 'Containers, Compose, optimized images, multi-stage'
            },
            projects: ['Deployments']
        },
        'CICD': {
            label: 'CI/CD',
            fullName: { es: 'CI/CD', en: 'CI/CD' },
            category: 'devops',
            level: 2,
            years: 3,
            icon: './assets/icons/cicd.svg',
            description: {
                es: 'GitHub Actions, pipelines automatizados, testing continuo',
                en: 'GitHub Actions, automated pipelines, continuous testing'
            },
            projects: ['All Projects']
        },
        'LINUX': {
            label: 'Linux',
            fullName: { es: 'Linux', en: 'Linux' },
            category: 'devops',
            level: 3,
            years: 4,
            icon: './assets/icons/linux.svg',
            description: {
                es: 'Shell scripting, administración de servidores, SSH',
                en: 'Shell scripting, server administration, SSH'
            },
            projects: ['Server Management']
        },
        'NGINX': {
            label: 'Nginx',
            fullName: { es: 'Nginx', en: 'Nginx' },
            category: 'devops',
            level: 2,
            years: 2,
            icon: './assets/icons/nginx.svg',
            description: {
                es: 'Reverse proxy, load balancing, SSL, configuración',
                en: 'Reverse proxy, load balancing, SSL, configuration'
            },
            projects: ['Production Servers']
        },
        'AWS': {
            label: 'AWS',
            fullName: { es: 'Amazon Web Services', en: 'Amazon Web Services' },
            category: 'devops',
            level: 2,
            years: 2,
            icon: './assets/icons/aws.svg',
            description: {
                es: 'Cloud computing, servicios core, arquitectura cloud',
                en: 'Cloud computing, core services, cloud architecture'
            },
            projects: ['Cloud Apps']
        },
        'S3': {
            label: 'S3',
            fullName: { es: 'AWS S3', en: 'AWS S3' },
            category: 'devops',
            level: 3,
            years: 2,
            icon: './assets/icons/s3.svg',
            description: {
                es: 'Almacenamiento de objetos, hosting estático, backups',
                en: 'Object storage, static hosting, backups'
            },
            projects: ['File Storage']
        },
        'EC2': {
            label: 'EC2',
            fullName: { es: 'AWS EC2', en: 'AWS EC2' },
            category: 'devops',
            level: 2,
            years: 2,
            icon: './assets/icons/ec2.svg',
            description: {
                es: 'Servidores virtuales, auto-scaling, instancias',
                en: 'Virtual servers, auto-scaling, instances'
            },
            projects: ['Production Servers']
        },
        'SHIFT_R': {
            label: 'SHIFT',
            fullName: { es: 'Filtrar', en: 'Filter' },
            category: 'special',
            isSpecial: true,
            size: 'shift',
            action: 'cycleFilter',
            description: {
                es: 'Cambiar filtro de categorías',
                en: 'Cycle through category filters'
            }
        },

        // === SPACEBAR ROW (Fila 5) ===
        'CTRL': {
            label: 'CTRL',
            fullName: { es: 'Control', en: 'Control' },
            category: 'special',
            isSpecial: true,
            size: 'ctrl',
            action: 'openCV',
            description: {
                es: 'Descargar CV',
                en: 'Download CV'
            }
        },
        'ALT': {
            label: 'ALT',
            fullName: { es: 'Labs', en: 'Labs' },
            category: 'special',
            isSpecial: true,
            size: 'alt',
            action: 'goLabs',
            description: {
                es: 'Ver experimentos y labs',
                en: 'View experiments and labs'
            }
        },
        'SPACE': {
            label: 'SPACE',
            fullName: { es: 'Sobre Mí', en: 'About Me' },
            category: 'special',
            isSpecial: true,
            size: 'space',
            action: 'showAbout',
            description: {
                es: 'Mi filosofía: código limpio, soluciones elegantes, aprendizaje continuo. Creo en construir software que perdure.',
                en: 'My philosophy: clean code, elegant solutions, continuous learning. I believe in building software that lasts.'
            }
        },
        'ALTGR': {
            label: 'ALT',
            fullName: { es: 'Demos', en: 'Demos' },
            category: 'special',
            isSpecial: true,
            size: 'alt',
            action: 'goDemos',
            description: {
                es: 'Ver demos interactivos',
                en: 'View interactive demos'
            }
        },
        'FN': {
            label: 'FN',
            fullName: { es: 'Contacto', en: 'Contact' },
            category: 'special',
            isSpecial: true,
            size: 'ctrl',
            action: 'goContact',
            description: {
                es: 'Ir a la sección de contacto',
                en: 'Go to contact section'
            }
        }
    },

    // Categorías disponibles para filtrado
    categories: [
        { id: 'all', label: { es: 'Todas', en: 'All' } },
        { id: 'frontend', label: { es: 'Frontend', en: 'Frontend' }, color: '#00ff66' },
        { id: 'backend', label: { es: 'Backend', en: 'Backend' }, color: '#00ccff' },
        { id: 'database', label: { es: 'Bases de Datos', en: 'Database' }, color: '#ff6600' },
        { id: 'devops', label: { es: 'DevOps', en: 'DevOps' }, color: '#cc66ff' }
    ],

    // Configuración del panel de información
    defaultScreen: {
        title: { es: 'Selecciona una tecla', en: 'Select a key' },
        description: {
            es: 'Pasa el mouse sobre cualquier tecla para ver detalles, o haz clic para fijar la selección.',
            en: 'Hover over any key to see details, or click to pin the selection.'
        }
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KEYBOARD_DATA;
}
