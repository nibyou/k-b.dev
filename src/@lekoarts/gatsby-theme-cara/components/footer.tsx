/** @jsx jsx */
import { Box, Flex, useColorMode, jsx } from "theme-ui"
import { Link } from "gatsby"

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <Box as="footer" variant="footer">
      <button
        sx={{ variant: `buttons.toggle`, fontWeight: `semibold`, display: `block`, mx: `auto`, mb: 3 }}
        onClick={toggleColorMode}
        type="button"
        aria-label="Toggle dark mode"
      >
        {isDark ? `Hell` : `Dunkel`}
      </button>
      Copyright &copy; {new Date().getFullYear()}. Alle Rechte vorberhalten.
      <br />
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          mt: 3,
          color: `text`,
          fontWeight: `semibold`,
          a: { color: `text` },
        }}
      >
        <Link to="/impressum">Impressum</Link>
      </Flex>
    </Box>
  )
}

export default Footer