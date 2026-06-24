import { useState, useEffect } from "react";
import {
  Database,
  Server,
  FileText,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Table2,
  Code2,
  BookOpen,
  Terminal,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

const SKILLS = {
  "Bases de Datos": [
    { name: "PostgreSQL", level: "Basico" },
    { name: "MySQL / MariaDB", level: "Intermedio" },
    { name: "SQL Server", level: "Basico" },
  ],
  "Backend & APIs": [
    { name: "Java", level: "Basico" },
    { name: "REST APIs", level: "Basico" },
  ],
  "Documentación & Modelado": [
    { name: "SQL DDL / DML", level: "Basico" },
    { name: "Modelado E-R", level: "Basico" },
    { name: "Swagger / OpenAPI", level: "Basico" },
    { name: "Diagramas UML", level: "Basico" },
  ],
};

const PROJECTS = [
  {
    title: "Sistema de Inventario Hospitalario",
    desc: "Base de datos relacional para gestión de insumos médicos con triggers de alerta de stock mínimo, vistas materializadas para reportes y procedimientos almacenados para auditoría.",
    tags: ["PostgreSQL", "PL/pgSQL", "Vistas"],
    icon: <Database size={20} />,
    accent: "#00c9a7",
    sql: `CREATE MATERIALIZED VIEW vw_stock_critico AS
SELECT producto_id, nombre, stock_actual
FROM inventario
WHERE stock_actual < stock_minimo;`,
  },
  {
    title: "API REST de Gestión Académica",
    desc: "Backend con FastAPI conectado a PostgreSQL. Documentación interactiva generada con Swagger, autenticación JWT, y modelo de datos normalizado en 3FN para registro de calificaciones.",
    tags: ["FastAPI", "PostgreSQL", "Swagger", "JWT"],
    icon: <Server size={20} />,
    accent: "#3b82f6",
    sql: `-- Endpoint: GET /alumnos/{id}/calificaciones
SELECT m.nombre, c.calificacion, c.periodo
FROM calificaciones c
JOIN materias m ON m.id = c.materia_id
WHERE c.alumno_id = $1;`,
  },
  {
    title: "Data Warehouse de Ventas",
    desc: "Diseño e implementación de un DWH con esquema estrella en MySQL. Proceso ETL con scripts Python para carga incremental y dashboards de métricas de ventas mensuales.",
    tags: ["MySQL", "ETL", "Python", "Esquema Estrella"],
    icon: <Table2 size={20} />,
    accent: "#f59e0b",
    sql: `-- Tabla de hechos
CREATE TABLE fact_ventas (
  venta_id    BIGINT PRIMARY KEY,
  fecha_id    INT REFERENCES dim_fecha,
  producto_id INT REFERENCES dim_producto,
  monto       DECIMAL(12,2)
);`,
  },
  {
    title: "Documentación Técnica de APIs",
    desc: "Portal de documentación para un ecosistema de microservicios con OpenAPI 3.0, guías de integración, ejemplos de request/response y versionado de endpoints.",
    tags: ["OpenAPI", "Docusaurus", "Markdown", "Microservicios"],
    icon: <BookOpen size={20} />,
    accent: "#8b5cf6",
    sql: `openapi: 3.0.0
info:
  title: API Pagos v2
  version: "2.1.0"
paths:
  /pagos:
    post:
      summary: Registrar pago`,
  },
];

const EXPERIENCE = [
  {
    period: "2023 — Actual",
    role: "Desarrolladora Backend & DBA Jr.",
    company: "TechData Solutions",
    desc: "Diseño y optimización de esquemas PostgreSQL, creación de APIs REST con FastAPI, generación de documentación técnica con Swagger y Confluence.",
  },
  {
    period: "2022 — 2023",
    role: "Analista de Bases de Datos",
    company: "Corporativo Nexum",
    desc: "Administración de instancias MySQL y Oracle, escritura de procedimientos almacenados, normalización de modelos de datos heredados y elaboración de reportes SQL.",
  },
  {
    period: "2021 — 2022",
    role: "Practicante de Desarrollo",
    company: "StartupMX",
    desc: "Soporte en migraciones de datos, documentación de esquemas con herramientas ER y scripting Python para procesos ETL básicos.",
  },
];


function SkillBar({ name, level }: { name: string; level: number }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-mono text-foreground/80">{name}</span>
        <span className="text-xs font-mono text-primary opacity-80">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border border-border rounded-lg overflow-hidden bg-card flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-white/20 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-6 pb-4 flex items-start gap-3 border-b border-border">
        <div
          className="mt-0.5 p-2 rounded-md flex-shrink-0"
          style={{ background: `${project.accent}18`, color: project.accent }}
        >
          {project.icon}
        </div>
        <div>
          <h3 className="font-semibold text-foreground leading-tight text-base">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded-full border border-border"
                style={{ color: project.accent }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>

        <div
          className="rounded-md overflow-hidden border border-border flex-1 transition-all duration-300"
          style={{ background: "#060a14" }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="ml-2 text-xs font-mono text-white/20">snippet.sql</span>
          </div>
          <pre
            className="text-xs font-mono p-4 leading-relaxed overflow-x-auto"
            style={{ color: hovered ? "#00c9a7" : "#6b7a99" }}
          >
            {project.sql}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState(Object.keys(SKILLS)[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif]">

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur border-b border-border" : ""
          }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-mono text-sm tracking-widest uppercase text-primary font-semibold cursor-pointer"
            onClick={() => scrollTo("#hero")}
          >
            AMHA
          </span>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <a
            href="mailto:ailyn@example.com"
            className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            Contáctame
          </a>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-card border-b border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,201,167,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,167,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,201,167,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl w-full text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 bg-card">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
              Disponible para proyectos
            </span>
          </div>

          <h1
            className="font-['Plus_Jakarta_Sans',sans-serif] text-5xl md:text-7xl font-extrabold leading-none tracking-tight text-foreground"
          >
            Ailyn{" "}
            <span className="text-primary">Monserrat</span>
            <br />
            Hernández Altunar
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {[
              { icon: <Database size={14} />, label: "Database Engineer" },
              { icon: <Server size={14} />, label: "Backend Developer" },
              { icon: <FileText size={14} />, label: "Technical Writer" },
            ].map((r) => (
              <span
                key={r.label}
                className="inline-flex items-center gap-1.5 text-sm font-mono px-3 py-1.5 rounded-md border border-border bg-card text-muted-foreground"
              >
                <span className="text-primary">{r.icon}</span>
                {r.label}
              </span>
            ))}
          </div>

          <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
            Diseño y optimizo bases de datos relacionales, construyo APIs robustas y
            documento sistemas para que los equipos puedan entender, mantener y escalar
            el software.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <button
              onClick={() => scrollTo("#projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              Ver proyectos <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-sm font-medium text-foreground hover:border-white/30 transition-colors duration-200"
            >
              Contacto
            </button>
          </div>

          <div
            className="mt-8 w-full max-w-lg rounded-lg border border-border overflow-hidden text-left"
            style={{ background: "#060a14" }}
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs font-mono text-white/20">ailyn ~ portfolio</span>
            </div>
            <div className="px-4 py-4 font-mono text-xs leading-relaxed">
              <p>
                <span className="text-primary">$</span>{" "}
                <span className="text-white/60">SELECT</span>{" "}
                <span className="text-yellow-400">nombre, rol, experiencia</span>
              </p>
              <p className="pl-4">
                <span className="text-white/60">FROM</span>{" "}
                <span className="text-blue-400">desarrolladoras</span>
              </p>
              <p className="pl-4">
                <span className="text-white/60">WHERE</span>{" "}
                <span className="text-foreground/70">especialidad = </span>
                <span className="text-green-400">"bases de datos"</span>
              </p>
              <p className="pl-4 mb-3">
                <span className="text-white/60">AND</span>{" "}
                <span className="text-foreground/70">nombre = </span>
                <span className="text-green-400">"Ailyn Monserrat"</span>
                <span className="text-white/60">;</span>
              </p>
              <div className="border-t border-border pt-3 text-muted-foreground">
                <p className="text-white/30 mb-1">-- 1 row returned</p>
                <p>
                  <span className="text-primary">Ailyn Monserrat</span>
                  <span className="text-white/30"> | </span>
                  <span className="text-blue-400">DBA &amp; Backend Dev</span>
                  <span className="text-white/30"> | </span>
                  <span className="text-yellow-400">3+ años</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40">
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div
              className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-border"
              style={{ background: "#0f1626" }}
            >
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&auto=format"
                alt="Programadora trabajando con bases de datos"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 grid grid-cols-3 gap-3 bg-gradient-to-t from-background/90 to-transparent">
                {[
                  { n: "3+", label: "Años exp." },
                  { n: "12+", label: "Proyectos" },
                  { n: "5+", label: "Motores DB" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold text-primary font-['Plus_Jakarta_Sans',sans-serif]">
                      {s.n}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-primary/30 rounded-br-lg pointer-events-none" />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
                01 / Sobre mí
              </p>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold leading-tight text-foreground">
                Datos bien estructurados,<br />
                sistemas que escalan.
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Soy Ailyn Monserrat, desarrolladora especializada en diseño de bases de
              datos relacionales, construcción de backends eficientes y documentación
              técnica clara. Me apasiona el modelado de datos, la optimización de
              consultas y ayudar a los equipos a entender sus propios sistemas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Trabajo con PostgreSQL y MySQL. En el backend construyo APIs
              y documento todo con Swagger, OpenAPI y Markdown para que la integración sea sencilla.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["PostgreSQL", "API rápida", "OpenAPI", "ETL", "PL/SQL"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              02 / Habilidades
            </p>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-foreground">
              Stack técnico
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {Object.keys(SKILLS).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSkillTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium font-mono transition-all duration-200 ${activeSkillTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SKILLS[activeSkillTab as keyof typeof SKILLS].map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-border">
            <p className="text-xs font-mono text-muted-foreground mb-6 tracking-widest uppercase">
              Tecnologías con las que trabajo
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "PostgreSQL", "MySQL", "SQL Server",
                "Java", "Swagger",
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-sm font-mono px-3 py-2 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors duration-200 cursor-default"
                >
                  <Terminal size={12} className="text-primary" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              03 / Proyectos
            </p>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-foreground">
              Trabajo destacado
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://github.com/Ailyn-Altunar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 border border-border px-5 py-2.5 rounded-md hover:border-white/20"
            >
              <Github size={16} />
              Ver más en GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              04 / Experiencia
            </p>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-foreground">
              Trayectoria
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border hidden md:block" />

            <div className="flex flex-col gap-10">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="md:pl-10 relative">
                  <div className="hidden md:block absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary -translate-x-[3.5px] ring-4 ring-background" />

                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <span className="text-xs font-mono text-primary whitespace-nowrap md:w-32 flex-shrink-0 mt-0.5">
                      {e.period}
                    </span>
                    <div className="flex-1 border border-border rounded-lg p-5 bg-card hover:border-white/20 transition-colors duration-200">
                      <h3 className="font-semibold text-foreground">{e.role}</h3>
                      <p className="text-sm text-primary font-mono mt-0.5 mb-3">{e.company}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 px-6 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-14 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-border">
                <p className="text-xs font-mono tracking-widest uppercase text-primary">
                  05 / Contacto
                </p>
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  ¿Tienes un proyecto<br />de datos?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estoy disponible para proyectos de diseño de bases de datos, desarrollo
                  de APIs, consultoría de modelado o documentación técnica.
                  Escribeme y hablamos.
                </p>
                <div className="flex flex-col gap-3 mt-2">
                  {[
                    { icon: <Mail size={16} />, label: "ailyn.hernandez.altunar@gmail.com", href: "mailto:ailyn.hernandez.altunar@gmail.com" },
                    { icon: <Github size={16} />, label: "github.com/Ailyn-Altunar", href: "https://github.com/Ailyn-Altunar" },
                    { icon: <Linkedin size={16} />, label: "linkedin.com/in/ailynaltunar-design", href: "https://linkedin.com/in/ailynaltunar-design" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                    >
                      <span className="text-primary/60 group-hover:text-primary transition-colors duration-200">
                        {link.icon}
                      </span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <form
                className="p-10 md:p-14 flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 mt-2"
                >
                  Enviar mensaje <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted-foreground/50">
            © 2024 Ailyn Monserrat Hernández Altunar
          </span>
          <div className="flex items-center gap-2">
            <Code2 size={12} className="text-primary" />
            <span className="font-mono text-xs text-muted-foreground/40">
              Diseñado y construido con React + Tailwind
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
