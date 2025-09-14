import React from "react";
import SectionTitle from "../../components/SectionTitle";
import LazyImage from "../../components/LazyImage";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const { portfolioData, theme } = useSelector((state) => state.root);
  const { projects } = portfolioData || {};

  if (!projects || projects.length === 0) {
    return (
      <div id="projects">
        <SectionTitle title="Projects" />
        <div className="text-white dark:text-gray-700 text-center py-10">
          <p>No projects available at the moment.</p>
        </div>
      </div>
    );
  }
  return (
    <div id="projects">
      <SectionTitle title="Projects" />

      <div className="flex py-12 gap-24 sm:flex-col sm:gap-8">
        <div className="flex flex-col gap-8 border-l-2 border-[#135e4c82] dark:border-tertiary-light w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full sm:border-l-0 sm:border-b-2 sm:pb-4">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-lg px-8 py-3 rounded-lg transition-all duration-200 cursor-pointer
                       ${
                         selectedItemIndex === index
                           ? "text-tertiary dark:text-tertiary-light border-tertiary dark:border-tertiary-light border-l-4 -ml-[3px] bg-[#1a7f5a31] dark:bg-tertiary-light/20 font-semibold"
                           : "text-white dark:text-gray-700 hover:text-tertiary dark:hover:text-tertiary-light hover:bg-gray-800/50 dark:hover:bg-gray-700/50"
                       }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-start justify-center gap-12 sm:flex-col sm:gap-8">
          {/* Project Image - Made larger and more prominent */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-tertiary to-tertiary-light rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <LazyImage
              src={projects[selectedItemIndex].image}
              alt={projects[selectedItemIndex].title}
              className="relative h-80 w-96 sm:h-64 sm:w-80 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300 object-cover"
              placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzg0IiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDM4NCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzODQiIGhlaWdodD0iMzIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xOTIgMTYwTDE3NiAxNDRMMTYwIDE2MEwxNzYgMTc2TDE5MiAxNjBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo="
            />
          </div>

          {/* Project Details */}
          <div className="flex flex-col gap-6 flex-1 max-w-lg">
            <h1 className="text-secondary dark:text-secondary-light text-2xl font-bold">
              {projects[selectedItemIndex].title}
            </h1>

            <p className="text-white dark:text-gray-700 text-base leading-relaxed">
              {projects[selectedItemIndex].description}
            </p>
            
            <div className="flex flex-row gap-4 mt-6">
              <button 
                onClick={() => {
                  const projectLink = projects[selectedItemIndex].link;
                  const fullUrl = projectLink.startsWith('http') ? projectLink : `https://${projectLink}`;
                  window.open(fullUrl, "_blank");
                }}  
                className="btn-secondary px-6 py-3 text-sm font-medium hover:scale-105 transition-transform duration-200"
              >
                <span className="text-tertiary dark:text-tertiary-light">
                  View Project
                </span>
              </button>

              <button 
                onClick={() => {
                  const githubUrl = projects[selectedItemIndex].githubUrl || 
                    `https://github.com/SKSingh0703/${projects[selectedItemIndex].title.toLowerCase().replace(/\s+/g, '-')}`;
                  window.open(githubUrl, "_blank");
                }} 
                className="btn-secondary px-6 py-3 text-sm font-medium hover:scale-105 transition-transform duration-200"
              >
                <span className="text-tertiary dark:text-tertiary-light">Github Repository</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
