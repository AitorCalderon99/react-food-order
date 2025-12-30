import logoImg from '../assets/logo.jpg'

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo image" />
        <h1>ReactFOOD</h1>
      </div>
      <nav>
        <button>Carty (0)</button>
      </nav>
    </header>
  )
}
