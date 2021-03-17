interface ContentProps {
  selectedGenre: {
    title: string;
  }
}
export function Header(props:ContentProps) {
  return (
    <header>
      <span className="category">Categoria:<span> {props.selectedGenre.title}</span></span>
    </header>
  )
}