import logoImg from '../assets/logo.jpg'
import Button from './UI/Button.jsx'

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo image" />
        <h1>ReactFOOD</h1>
      </div>
      <nav>
        <Button textOnly>Carty (0)</Button>
      </nav>
    </header>
  )
}
