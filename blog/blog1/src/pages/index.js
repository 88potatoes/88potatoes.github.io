function Blog(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.date}</h2>
      <p>{props.body}</p>
    </div>
  );
}

export default function Home() {
  return (
    <Blog date="24/03/2023" title="Starting new things early"
    body="Moving beyond the comfort zone and doing new things is an unavoidable part of life.
    The question is, when to get our feet wet.
    
    Let’s use the example of investing in the stock market.
    We research the different stock markets, how to invest and what to invest in. But at what point do we put in money and start investing?
    
    To me, it makes sense to start as soon as you know that investing won’t be a massive risk.
    
    At the heart of this issue of when to start is the conflict between theory and practice.
    
    Too much theory initially can make you focus too much on doing something perfectly and can paralyse you, while you would have made more progress if you had just started.
    You can always learn more theory as you go along and it will all make more sense because you have experience. It makes for a more organic learning experience overall.
    
    Learning theory however can ensure that you are safe in what you are doing, especially since you are starting something new without much knowledge beforehand.
    
    Now that I reflect, starting before I knew much is how I started going to the gym and journalling.
    Also used this concept to start writing this little blog. Hopefully it will continue for the foreseeable future.
    
    Basically, start early.

    Stay warm and motivated.
    
    Eric"/>
  );
}
