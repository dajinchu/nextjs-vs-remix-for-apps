export default function Page({ params: { dog } }: { params: { dog: string } }) {
  return (
    <div>
      <h1>THis is a good dog</h1>
      <div>His name is: {dog}</div>
      <div>more info about dogs</div>
    </div>
  );
}
