const root = typeof document !== 'undefined' ? document.documentElement : null

export const applyDark = () => {
  root?.classList.remove('light')
  root?.classList.add('dark')
}

export const applyTheme = (theme: string) => {
  if (theme === 'dark') {
    applyDark()
  } else {
    root?.classList.remove('dark')
    root?.classList.add('light')
  }
}

export const ANTI_FLICKER_THEME_SCRIPT = `
              (function() {
                try {
                  const themeData = localStorage.getItem('theme');
                  if (themeData) {
                    const parsed = JSON.parse(themeData);
                    const theme = parsed.state?.theme || 'light';
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `
