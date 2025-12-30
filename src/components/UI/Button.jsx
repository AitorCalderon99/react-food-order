export default function Button({ textOnly, className, children, ...props }) {
  let cssClasses = textOnly ? 'text-button' : 'button'
  cssClasses += ' ' + className

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  )
}
