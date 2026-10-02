import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

const projects = [
  {
    id: 1,
    key: "buildingConstruction",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 2,
    key: "roadInfrastructure",
    image:
      "https://images.unsplash.com/photo-1590644365607-1c5a3f0b8f9d?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 3,
    key: "heavyEquipment",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 4,
    key: "siteDevelopment",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 5,
    key: "infrastructureWorks",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: 6,
    key: "constructionMachinery",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=90",
  },
];

const filterKeys = [
  "all",
  "building",
  "roads",
  "equipment",
  "backfilling",
];

const categoryToFilter = {
  buildingConstruction: "building",
  roadInfrastructure: "roads",
  heavyEquipment: "equipment",
  siteDevelopment: "backfilling",
  infrastructureWorks: "roads",
  constructionMachinery: "equipment",
};

const Projects = () => {
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter(
      (project) =>
        categoryToFilter[project.key] ===
        activeFilter
    );
  }, [activeFilter]);

  const currentIndex = selectedProject
    ? projects.findIndex(
        (project) =>
          project.id === selectedProject.id
      )
    : -1;

  const showPrevious = () => {
    if (currentIndex === -1) {
      return;
    }

    const previousIndex =
      currentIndex === 0
        ? projects.length - 1
        : currentIndex - 1;

    setSelectedProject(
      projects[previousIndex]
    );
  };

  const showNext = () => {
    if (currentIndex === -1) {
      return;
    }

    const nextIndex =
      currentIndex ===
      projects.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedProject(
      projects[nextIndex]
    );
  };

  const getProject = (project) => {
    const data = t(
      `projectsPage.items.${project.key}`,
      {
        returnObjects: true,
      }
    );

    return {
      title: data?.title || "",
      category: data?.category || "",
      location: data?.location || "",
      description: data?.description || "",
    };
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050706] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/5 pt-36 sm:pt-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=90"
            alt={t("projectsPage.title")}
            className="h-full w-full object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#050706]/70 via-[#050706]/90 to-[#050706]" />

        <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[130px]" />

        <div className="container-premium relative z-10 py-24 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <Logo compact />

            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-12 bg-[#d4af37]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                {t("projectsPage.eyebrow")}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {t("projectsPage.title")}

              <span className="block text-[#d4af37]">
                {t("projectsPage.titleAccent")}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {t("projectsPage.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}

      <section className="border-b border-white/5 bg-[#070908]">
        <div className="container-premium py-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterKeys.map((filter) => {
              const active =
                activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`shrink-0 cursor-pointer rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                    active
                      ? "border-[#d4af37] bg-[#d4af37] text-[#070907]"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#d4af37]/40 hover:text-white"
                  }`}
                >
                  {t(
                    `projectsPage.filters.${filter}`
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRID */}

      <section className="py-20 sm:py-28">
        <div className="container-premium">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs text-[#d4af37]">
                / {t("projectsPage.selectedWork")}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("projectsPage.showcase")}
              </h2>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-3xl font-semibold text-white">
                {filteredProjects.length
                  .toString()
                  .padStart(2, "0")}
              </p>

              <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">
                {t("projectsPage.projectsLabel")}
              </p>
            </div>
          </div>

          <motion.div
            layout
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(
                (project, index) => {
                  const data =
                    getProject(project);

                  return (
                    <motion.article
                      layout
                      key={project.id}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.04,
                      }}
                      className="group cursor-pointer"
                      onClick={() =>
                        setSelectedProject(
                          project
                        )
                      }
                    >
                      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0a0d0b]">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={project.image}
                            alt={data.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                        <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                          <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur-md">
                            {data.category}
                          </span>

                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition group-hover:border-[#d4af37]/50 group-hover:text-[#d4af37]">
                            <ArrowUpRight
                              size={17}
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
                            {data.location}
                          </p>

                          <h3 className="mt-2 text-xl font-semibold">
                            {data.title}
                          </h3>

                          <p className="mt-2 max-w-sm text-xs leading-6 text-slate-400">
                            {data.description}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}

      <section className="border-t border-white/5 bg-[#080b09] py-20">
        <div className="container-premium">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/20 bg-[#0c100d] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-[100px]" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">
                  {t("servicesPage.quotationTitle")}
                </p>

                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  {t("servicesPage.quotationHeading")}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  {t("servicesPage.quotationDescription")}
                </p>
              </div>

              <a
                href="/quote"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070907] transition hover:bg-[#f0d477]"
              >
                {t("common.getQuote")}

                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() =>
              setSelectedProject(null)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080b09]"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {(() => {
                const data =
                  getProject(
                    selectedProject
                  );

                return (
                  <>
                    <div className="relative">
                      <img
                        src={
                          selectedProject.image
                        }
                        alt={data.title}
                        className="max-h-[70vh] w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProject(
                            null
                          )
                        }
                        className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                        aria-label={t(
                          "projectsPage.closePreview"
                        )}
                      >
                        <X size={19} />
                      </button>

                      <button
                        type="button"
                        onClick={showPrevious}
                        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                        aria-label={t(
                          "projectsPage.previousProject"
                        )}
                      >
                        <ChevronLeft
                          size={20}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={showNext}
                        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                        aria-label={t(
                          "projectsPage.nextProject"
                        )}
                      >
                        <ChevronRight
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="p-6 sm:p-8">
                      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                        {data.category} /{" "}
                        {data.location}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                        {data.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                        {data.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}

      <footer className="border-t border-white/5 bg-[#030504] py-10">
        <div className="container-premium flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo compact />

            <p className="mt-3 text-xs text-slate-600">
              {t("home.location")},{" "}
              {t("home.oman")}
            </p>
          </div>

          <p className="text-[10px] text-slate-700">
            © {new Date().getFullYear()} AL MALIK AL MASIAH Trading &
            Contracting L.L.C
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Projects;