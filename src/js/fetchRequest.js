const fetchRequest = async () => {
  try {
    const response = await fetch(
      'https://pixabay.com/api/?key=32891390-a52999f78b5dd379dfcc20192&q=water&image_type=photo&orientation=horizontal&safesearch=true'
    );
    const resultRequest = await response.json();
    console.log(resultRequest);
  } catch (error) {
    console.log(error.message);
  }
};

fetchRequest();
