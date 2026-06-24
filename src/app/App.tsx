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
  Camera,
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
    title: "ErgoHabit",
    desc: "ErgoHabit Backend es una API REST robusta, escalable y de alto rendimiento diseñada bajo el paradigma de Arquitectura Hexagonal (Ports and Adapters) y guiada estrictamente por los principios SOLID y Clean Architecture. Su propósito principal es servir como el motor de inteligencia y persistencia para la aplicación móvil de gestión de hábitos y monitoreo de ergonomía cervical.",
    tags: ["Kotlin", "Ktor", "PostgreSQL", "Hexagonal Architecture"],
    linkText: "Ver Repositorio",
    linkUrl: "https://github.com/vianeyruizlopez/ErgoHabit.git",
  },
  {
    title: "AgroData API",
    desc: "API modular diseñada para la gestión y administración de cultivos agrícolas y talleres. Enfocada en la correcta estructuración de las responsabilidades, modularidad y la estandarización estricta de contratos de endpoints.",
    tags: ["Java", "Javalin Framework", "MVC", "SQL"],
    linkText: "Ver Repositorio",
    linkUrl: "https://github.com/vianeyruizlopez/API-agroData.git",
  },
  {
    title: "Kpop(Aplicación Móvil)",
    desc: "Aplicación móvil que permite a los usuarios buscar, descubrir y guardar información sobre grupos y artistas de K-pop. Incluye detalles biográficos, discografía, imágenes y funcionalidades sociales.",
    tags: ["Kotlin", "Android", "REST APIs", "MVVM", "SQLite"],
    linkText: "Ver Repositorio",
    linkUrl: "https://github.com/Ailyn-Altunar/kpopApp.git",
  },
  {
    title: "Finanza sana (Aplicación Móvil)",
    desc: "Aplicación móvil que permite a los usuarios gestionar sus finanzas personales. Incluye funcionalidades como registro de gastos, ingresos, presupuestos, categorías y reportes.",
    tags: ["Kotlin", "Android", "REST APIs", "MVVM", "SQLite"],
    linkText: "Ver Repositorio",
    linkUrl: "https://github.com/Ailyn-Altunar/FinanzaSanaAndroid1.git",
  },
];

const EXPERIENCE = [
  {
    period: "Junio - En desarrollo 2026",
    role: "Administradora de Base de datos",
    company: "Proyecto academico",
    desc: "Diseño y optimización de esquemas PostgreSQL, creación de scripts SQL, generación de documentación técnica .",
  },
  {
    period: "Abril 2026",
    role: "Backend developer",
    company: "Proyecto academico",
    desc: "Desarrollo de una API REST con Kotlin, utilizando Ktor como framework, PostgreSQL como base de datos relacional y Swagger como herramienta de documentación.",
  },
  {
    period: "Septimebre - Diciembre 2025",
    role: "Base de datos",
    company: "Proyecto academico",
    desc: "Diseño de base de datos relacionales, diagrama entidad - relacion, normalización de base de datos, consultas SQL, scripts SQL.",
  },
];


function SkillBar({ name, level }: { name: string; level: string }) {
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-xl border border-transparent hover:border-[#a78bfa]/20 hover:bg-[#13102a]/50 transition-colors duration-300">
      <span className="font-semibold tracking-tight" style={{ color: "#ede9fe" }}>{name}</span>
      <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(192,132,252,0.1)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.25)" }}>
        {level}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ background: "#13102a", border: "1px solid rgba(167,139,250,0.18)" }}
    >
      <div className="p-6 md:p-8 flex-1 flex flex-col gap-4">
        <h3 className="font-bold text-xl md:text-2xl" style={{ color: "#ede9fe" }}>
          {project.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed flex-1" style={{ color: "#c4b5fd" }}>
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1.5 rounded"
              style={{ background: "rgba(192,132,252,0.1)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.25)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 md:px-8 md:pb-8 mt-2">
        <a
          href={project.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90"
          style={{ background: "rgba(192,132,252,0.12)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.30)" }}
        >
          {project.linkText}
        </a>
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
    <div className="min-h-screen font-['Inter',sans-serif]" style={{ background: "#0a0810", color: "#ede9fe" }}>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0810]/90 backdrop-blur border-b border-[#a78bfa]/10" : ""
          }`}
      >
        <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <span
            className="font-['JetBrains_Mono',monospace] text-xl cursor-pointer select-none"
            onClick={() => scrollTo("#hero")}
          >
            <span className="font-light text-[#a78bfa]/60">/</span>
            <span className="font-bold text-[#a78bfa]">AMHA</span>
          </span>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-xs font-semibold tracking-widest uppercase text-[#a78bfa]/70 hover:text-[#a78bfa] transition-colors duration-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-[#a78bfa]"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-[#0d0a17] border-b border-[#a78bfa]/10 px-8 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-sm font-semibold tracking-widest uppercase text-[#a78bfa]/70 hover:text-[#a78bfa]"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <section
        id="hero"
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{ background: "#0a0810" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#171322 1px, transparent 1px), linear-gradient(90deg, #171322 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(192,132,252,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at bottom left, rgba(167,139,250,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto w-full px-8 pt-32 pb-24 flex flex-col items-center text-center gap-8">

          <div className="flex flex-col items-center gap-8">

            <div className="flex flex-col items-center leading-none">
              <span
                className="font-['Montserrat',sans-serif] font-black uppercase tracking-tighter"
                style={{ fontSize: "clamp(72px,10vw,120px)", color: "#ede9fe" }}
              >
                DATABASE
              </span>
              <span
                className="font-['Montserrat',sans-serif] font-black uppercase tracking-tighter"
                style={{ fontSize: "clamp(56px,8vw,96px)", color: "#c4b5fd", lineHeight: 1.1 }}
              >
                +
              </span>
              <span
                className="font-['Montserrat',sans-serif] font-black uppercase tracking-tighter"
                style={{ fontSize: "clamp(72px,10vw,120px)", color: "#ede9fe" }}
              >
                BACKEND
              </span>
            </div>

            <p
              className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
              style={{ color: "#c4b5fd" }}
            >
              Construyo experiencias digitales, busco la excelencia del código y el diseño,
              de la arquitectura a la gráfica.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="px-7 py-3.5 rounded-lg text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "#c084fc", color: "#0a0810" }}
              >
                CONTÁCTAME
              </button>
              <button
                onClick={() => scrollTo("#experience")}
                className="px-7 py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: "#ede9fe",
                  borderBottom: "2px solid #c084fc",
                  background: "transparent",
                }}
              >
                MI EXPERIENCIA
              </button>
            </div>

            <div className="flex items-center justify-center gap-5 pt-2">
              {[
                { href: "www.linkedin.com/in/ailyn-altunar", icon: <Linkedin size={22} /> },
                { href: "https://github.com/Ailyn-Altunar", icon: <Github size={22} /> },
                { href: "mailto:ailyn.hernandez.altunar@gmail.com", icon: <Mail size={22} /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:opacity-70 hover:-translate-y-0.5"
                  style={{ color: "#ede9fe" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ color: "#a78bfa" }}>
          <span className="text-xs font-mono tracking-widest uppercase opacity-40">scroll</span>
          <ChevronDown size={16} className="animate-bounce opacity-40" />
        </div>
      </section>

      <section id="about" className="py-24 px-8" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div
              className="w-full aspect-[4/3] rounded-lg overflow-hidden"
              style={{ border: "2px solid rgba(192,132,252,0.30)", background: "#0d0a1a" }}
            >
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&auto=format"
                alt="Programadora trabajando con bases de datos"
                className="w-full h-full object-cover"
                style={{ opacity: 0.8, filter: "saturate(0.85)" }}
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-20 h-20 pointer-events-none" style={{ borderBottom: "2px solid rgba(192,132,252,0.4)", borderRight: "2px solid rgba(192,132,252,0.4)" }} />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>
                01 / Sobre mí
              </p>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#ede9fe" }}>
                Datos bien estructurados,<br />
                sistemas que escalan.
              </h2>
            </div>
            <p className="leading-relaxed" style={{ color: "#c4b5fd" }}>
              Soy Ailyn Monserrat, desarrolladora especializada en diseño de bases de
              datos relacionales, construcción de backends eficientes y documentación
              técnica clara. Me apasiona el modelado de datos, la optimización de
              consultas y ayudar a los equipos a entender sus propios sistemas.
            </p>
            <p className="leading-relaxed" style={{ color: "#c4b5fd" }}>
              Trabajo con PostgreSQL y MySQL. En el backend construyo APIs
              y documento todo con Swagger, OpenAPI y Markdown para que la integración sea sencilla.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["PostgreSQL", "API rápida", "OpenAPI", "ETL", "PL/SQL"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full cursor-default transition-all duration-200 hover:opacity-80"
                  style={{ border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa", background: "rgba(167,139,250,0.07)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-8" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>
              02 / Habilidades
            </p>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold" style={{ color: "#ede9fe" }}>
              Stack técnico
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {Object.keys(SKILLS).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSkillTab(tab)}
                className="px-4 py-2 rounded-md text-sm font-medium font-mono transition-all duration-200"
                style={activeSkillTab === tab
                  ? { background: "#c084fc", color: "#0a0810" }
                  : { border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa", background: "transparent" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-2">
            {SKILLS[activeSkillTab as keyof typeof SKILLS].map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>

          <div className="mt-14 pt-8" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
            <p className="text-xs font-mono mb-6 tracking-widest uppercase" style={{ color: "#a78bfa" }}>
              Tecnologías con las que trabajo
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "PostgreSQL", "MySQL", "SQL Server",
                "Java", "Swagger",
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-sm font-mono px-3 py-2 rounded-md cursor-default transition-all duration-200 hover:opacity-80"
                  style={{ border: "1px solid rgba(167,139,250,0.20)", color: "#c4b5fd", background: "rgba(167,139,250,0.06)" }}
                >
                  <Terminal size={12} style={{ color: "#c084fc" }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-8" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>
              03 / Proyectos
            </p>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold" style={{ color: "#ede9fe" }}>
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
              className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-md transition-all duration-200 hover:opacity-80"
              style={{ border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa", background: "transparent" }}
            >
              <Github size={16} />
              Ver más en GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-8" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>
              04 / Experiencia
            </p>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold" style={{ color: "#ede9fe" }}>
              Trayectoria
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px hidden md:block" style={{ background: "rgba(167,139,250,0.20)" }} />

            <div className="flex flex-col gap-10">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="md:pl-10 relative">
                  <div className="hidden md:block absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[3.5px]" style={{ background: "#c084fc", boxShadow: "0 0 8px rgba(192,132,252,0.5)", outline: "4px solid #0a0810" }} />

                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <span className="text-xs font-mono whitespace-nowrap md:w-32 flex-shrink-0 mt-0.5" style={{ color: "#a78bfa" }}>
                      {e.period}
                    </span>
                    <div
                      className="flex-1 rounded-lg p-5 transition-all duration-200 hover:border-[rgba(192,132,252,0.35)]"
                      style={{ border: "1px solid rgba(167,139,250,0.18)", background: "#13102a" }}
                    >
                      <h3 className="font-semibold" style={{ color: "#ede9fe" }}>{e.role}</h3>
                      <p className="text-sm font-mono mt-0.5 mb-3" style={{ color: "#c084fc" }}>{e.company}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#c4b5fd" }}>{e.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-8" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(167,139,250,0.18)", background: "#0d0a1a" }}>
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-14 flex flex-col gap-6" style={{ borderBottom: "1px solid rgba(167,139,250,0.12)" }}>
                <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "#a78bfa" }}>
                  05 / Contacto
                </p>
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#ede9fe" }}>
                  ¿Tienes un proyecto<br />de datos?
                </h2>
                <p className="leading-relaxed" style={{ color: "#c4b5fd" }}>
                  Estoy disponible para proyectos de diseño de bases de datos, desarrollo
                  de APIs, consultoría de modelado o documentación técnica.
                  Escríbeme y hablamos.
                </p>
                <div className="flex flex-col gap-3 mt-2">
                  {[
                    { icon: <Mail size={16} />, label: "ailyn.hernandez.altunar@gmail.com", href: "mailto:ailyn.hernandez.altunar@gmail.com" },
                    { icon: <Github size={16} />, label: "github.com/Ailyn-Altunar", href: "https://github.com/Ailyn-Altunar" },
                    { icon: <Linkedin size={16} />, label: "linkedin.com/in/ailyn-altunar", href: "www.linkedin.com/in/ailyn-altunar" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-sm transition-colors duration-200"
                      style={{ color: "#c4b5fd" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#c4b5fd")}
                    >
                      <span style={{ color: "#a78bfa" }}>{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <form
                className="p-10 md:p-14 flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
                style={{ borderLeft: "1px solid rgba(167,139,250,0.12)" }}
              >
                {["Nombre", "Email"].map((label) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider" style={{ color: "#a78bfa" }}>
                      {label}
                    </label>
                    <input
                      type={label === "Email" ? "email" : "text"}
                      placeholder={label === "Email" ? "tu@email.com" : "Tu nombre"}
                      className="w-full rounded-md px-4 py-3 text-sm focus:outline-none transition-colors duration-200"
                      style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.20)", color: "#ede9fe" }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-xs font-mono uppercase tracking-wider" style={{ color: "#a78bfa" }}>
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="w-full rounded-md px-4 py-3 text-sm focus:outline-none transition-colors duration-200 resize-none"
                    style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.20)", color: "#ede9fe" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 mt-2"
                  style={{ background: "#c084fc", color: "#0a0810" }}
                >
                  Enviar mensaje <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-8" style={{ borderTop: "1px solid rgba(167,139,250,0.12)" }}>
        <div className="max-w-6xl mx-auto flex justify-center">
          <span className="font-mono text-xs" style={{ color: "rgba(167,139,250,0.40)" }}>
            © 2026 Ailyn Monserrat Hernández Altunar
          </span>
        </div>
      </footer>

    </div>
  );
}
