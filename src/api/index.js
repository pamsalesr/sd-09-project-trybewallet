export default async function getCurrency() {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(endPoint);
    const object = await response.json();

    if (object.error) throw new Error(object.error);

    return object;
  } catch (error) {
    console.log(error);
  }
}
