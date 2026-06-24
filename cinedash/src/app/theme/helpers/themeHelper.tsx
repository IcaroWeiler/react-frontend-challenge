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
