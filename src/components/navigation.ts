export const Navigation = () => {
  return `<nav
    class="fixed top-0 bg-white dark:bg-baseDark2 w-screen py-6 px-5 sm:px-5 md:px-10 shadow-lg z-10"
  >
    <div
      class="w-[98%] sm:w-[98%] md:w-[95%] flex items-center justify-between"
    >
      <a href="" class="text-gray-800 dark:text-slate-100 font-extrabold text-lg sm:text-lg md:text-2xl"
        >Where in the World?</a
      >

      <a href="" class="flex items-center text-gray-800 dark:text-slate-100 themeBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2 text-gray-800 dark:text-slate-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>

        Dark Mode</a
      >
    </div>
  </nav>`;
};
