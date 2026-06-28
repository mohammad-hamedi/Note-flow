export function ThemeInitScript() {
  const script = `
(function () {
  try {
    var theme = localStorage.getItem("noteflow-theme");
    var locale = localStorage.getItem("noteflow-locale");
    var parsedTheme = theme ? JSON.parse(theme) : "light";
    var parsedLocale = locale ? JSON.parse(locale) : "en";
    if (parsedTheme === "dark") document.documentElement.classList.add("dark");
    if (parsedLocale === "fa") {
      document.documentElement.lang = "fa";
      document.documentElement.dir = "rtl";
    }
  } catch (e) {}
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
