  
export const getPopupHTML = (book_properties: any) => {
  if(typeof book_properties == 'string') book_properties = JSON.parse(book_properties);
    return `
      <div class="text-center p-2 font-sans rounded-lg bg-white">
        <h3 class="text-lg font-bold text-gray-800">${book_properties.book.title}</h3>
        <p class="text-sm text-gray-600 italic"> ${book_properties.book.authors ? "by" + book_properties.book.authors[0]: ""}</p>
        <div class="bg-gray-50 p-3 mt-2 rounded-md">
         <p class="mt-2 text-sm font-semibold ${
          book_properties.status === "AVAILABLE"
            ? "text-green-600" 
            : "text-red-600"}">${book_properties.status === "AVAILABLE"  ? "Available" 
              : "Unavailable" } </p>
          <p class="text-sm text-gray-700"><span class="font-semibold">Owner:</span> ${book_properties.owner.name}</p>
          <p class="text-sm text-gray-700"><span class="font-semibold">Format:</span> ${book_properties.format}</p>
        </div>
      </div>`;
  };
  