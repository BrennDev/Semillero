const url = 'https://reqres.in/api/users?delay=2';
const contacts = [];

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  toggleVisibility('content-container', true);
  showContactSection();
  getContacts();
});

const toggleVisibility = (elementId, show) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = show ? 'block' : 'none';
  }
};

const showContactSection = () => {
  toggleVisibility('contact-create', false);
  toggleVisibility('contact-table', true);
};

const showFormSection = () => {
  toggleVisibility('contact-create', true);
  clearForm();
};

const setupEventListeners = () => {
  document
    .getElementById('show-contact')
    .addEventListener('click', showContactSection);
  document
    .getElementById('show-contact-create')
    .addEventListener('click', showFormSection);
  document
    .getElementById('contact-form')
    .addEventListener('submit', handleCreateContact);
  document
    .getElementById('contact-form')
    .addEventListener('input', validateForm);
};

const handleResponseError = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const createElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.assign(element, attributes);
  return element;
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 70) + 1;
};

const renderContactsTable = (contacts) => {
  const tableBody = document.getElementById('contacts-table-body');
  tableBody.innerHTML = '';

  contacts.forEach((contact) => {
    const row = createElement('tr', { className: 'row-contact' });

    const cellAvatar = createElement('td', { className: 'cellAvatar' });
    const avatarImg = createElement('img', {
      src:
        contact.avatar || `https://i.pravatar.cc/150?img=${getRandomNumber()}`,
      className: 'avatar',
      alt: `${contact.first_name} ${contact.last_name}`,
    });
    cellAvatar.appendChild(avatarImg);

    const cellName = createElement('td', {
      className: 'cell name',
      textContent: `${contact.first_name} ${contact.last_name}`,
    });

    const cellEmail = createElement('td', {
      className: 'cell email',
      textContent: contact.email,
    });

    const jobTitle = contact.job_title || '';
    const company = contact.company || '';

    const cellCompany = createElement('td', {
      className: 'cell email',
      textContent: `${jobTitle} ${company}`,
    });

    row.append(cellAvatar, cellName, cellEmail, cellCompany);
    tableBody.appendChild(row);
  });
};

const getContacts = async () => {
  toggleVisibility('loading-spinner', true);
  toggleVisibility('contact-table', false);
  const errorMessageElement = document.getElementById('error-message');

  try {
    const response = await fetch(url);
    const data = await handleResponseError(response);
    contacts.push(...data.data);
    renderContactsTable(contacts);
  } catch (error) {
    console.error('Fetch error:', error);
    errorMessageElement.textContent =
      'Error loading contacts. Please try again later.';
    toggleVisibility('error-message', true);
  } finally {
    toggleVisibility('loading-spinner', false);
    toggleVisibility('contact-table', true);
  }
};

const getContactDataForm = () => {
  const first_name = document.getElementById('contact-first-name').value;
  const last_name = document.getElementById('contact-last-name').value;
  const company = document.getElementById('contact-company').value;
  const job_title = document.getElementById('contact-job-title').value;
  const email = document.getElementById('contact-email').value;

  return {
    first_name,
    last_name,
    company,
    job_title,
    email,
  };
};

const submitContact = async (contactData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    const result = await handleResponseError(response);
    return result;
  } catch (error) {
    console.error('Post error:', error);
  }
};

const clearForm = () => {
  [
    'contact-first-name',
    'contact-last-name',
    'contact-company',
    'contact-job-title',
    'contact-email',
  ].forEach((id) => {
    document.getElementById(id).value = '';
  });
  document.getElementById('save-button').disabled = true;
};

const validateForm = () => {
  const form = document.getElementById('contact-form');
  const saveButton = document.getElementById('save-button');
  const isValid = form.checkValidity();
  saveButton.disabled = !isValid;
};

const handleCreateContact = async (event) => {
  event.preventDefault();
  const saveButton = document.getElementById('save-button');
  saveButton.disabled = true;
  toggleVisibility('form-spinner', true);

  try {
    const newContact = getContactDataForm();
    const createdContact = await submitContact(newContact);
    contacts.push(createdContact);
    console.log(contacts);
    renderContactsTable(contacts);
    showContactSection();
    clearForm();
  } catch (error) {
    console.error('Error creating contact:', error);
  } finally {
    toggleVisibility('form-spinner', false);
    saveButton.disabled = false;
  }
};
