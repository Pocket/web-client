export default {
  title: 'UI/Typography'
}

export const Typography = () => {
  return (
    <div>
      <div>
        <h1>SansSerif H1</h1>
        <h2>SansSerif H2</h2>
        <h3>SansSerif H3</h3>
        <h4>SansSerif H4</h4>
        <h5>SansSerif H5</h5>
        <h6>SansSerif H6</h6>
      </div>
      <hr />
      <div className="serif">
        <h1>Serif H1</h1>
        <h2>Serif H2</h2>
        <h3>Serif H3</h3>
        <h4>Serif H4</h4>
        <h5>Serif H5</h5>
        <h6>Serif H6</h6>
      </div>
      <hr />
      <div className="display">
        <h1>Display H1</h1>
        <h2>Display H2</h2>
        <h3>Display H3</h3>
        <h4>Display H4</h4>
        <h5>Display H5</h5>
        <h6>Display H6</h6>
      </div>
    </div>
  )
}
