document.addEventListener('DOMContentLoaded', function () {
  const saveItemButton = document.getElementById('saveItem');
  const categorySelect = document.getElementById('category');
  const listsContainer = document.getElementById('lists');
  const itemPreview = document.getElementById('itemPreview');

  // Load saved items from storage when popup is opened
  loadItems();

  // Update item preview when popup is opened
  updateItemPreview();

// Save item button click event
saveItemButton.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    const title = tabs[0].title;
    const category = categorySelect.value;
    
    // Save item to storage
    saveItem(title, url, category);
    
    // Update item list
    displayList(category, [{ title, url }]);
    
    // Clear item preview
    clearItemPreview();
  });
});

  // Function to save item to storage
  function saveItem(title, url, category) {
    chrome.storage.sync.get(['items'], function (result) {
      let items = result.items || [];
      items.push({ title, url, category });
      chrome.storage.sync.set({ items });
    });
  }

  // Function to load items from storage and display them in separate lists
  function loadItems() {
    chrome.storage.sync.get(['items'], function (result) {
      const items = result.items || [];
      const categories = {};
      
      items.forEach(item => {
        if (!categories[item.category]) {
          categories[item.category] = [];
        }
        categories[item.category].push(item);
      });

      // Display items in separate lists based on category
      Object.keys(categories).forEach(category => {
        displayList(category, categories[category]);
      });
    });
  }

  // Function to display items in a list
  function displayList(category, items) {
    const list = document.createElement('ul');
    const listTitle = document.createElement('h2');
    listTitle.textContent = category;
    list.appendChild(listTitle);
    
    items.forEach(item => {
      const listItem = document.createElement('li');
      
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = truncateString(item.title, 50);
      link.target = '_blank';
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.innerHTML = '&#x2716;';
      
      deleteButton.addEventListener('click', function () {
        deleteItem(item.title, item.url, category, listItem);
      });
      
      listItem.appendChild(link);
      listItem.appendChild(document.createTextNode(' '));
      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
    });

    listsContainer.appendChild(list);
  }

  // Function to delete item from the list and storage
  function deleteItem(title, url, category, listItem) {
    chrome.storage.sync.get(['items'], function (result) {
      let items = result.items || [];
      items = items.filter(item => !(item.title === title && item.url === url && item.category === category));
      chrome.storage.sync.set({ items });
      
      // Remove item from the list
      listItem.remove();
    });
  }

  // Function to update item preview
  function updateItemPreview() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const title = tabs[0].title;
      const truncatedTitle = truncateString(title, 50);
      itemPreview.textContent = truncatedTitle;
    });
  }

  // Function to clear item preview
  function clearItemPreview() {
    itemPreview.textContent = '';
  }

  // Function to truncate string to specified length
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }
});
