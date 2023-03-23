function Blog(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.date}</h2>
      <plaintext>{props.body}</plaintext>
    </div>
  );
}

export default function Home() {
  return (
    <Blog date="24/03/2023" title="Starting new things early"
    body=""/>
  );
}
