import React, { useState, useEffect } from 'react';

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts, setContacts] = useState([]);
    const [modalContacts, setModalContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        fetchContacts();
      }, []);
    
      useEffect(() => {
        if (showModalA) {
          setModalContacts(contacts);
        } else if (showModalB) {
          const usContacts = contacts.filter(contact => contact.country === 'US');
          setModalContacts(usContacts);
        }
      }, [showModalA, showModalB, contacts]);
    
      const fetchContacts = async () => {
        try {
          const response = await fetch(`https://contact.mediusware.com/api/contacts?page=${currentPage}`);
          const data = await response.json();
          setContacts(prevContacts => [...prevContacts, ...data.results]);
        } catch (error) {
          
        }
      };
    
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
      const openModalA = () => {
        setShowModalA(true);
        setShowModalB(false);
        setShowModalC(false);
        setCurrentPage(1);
      };
    
      const openModalB = () => {
        setShowModalA(false);
        setShowModalB(true);
        setShowModalC(false);
        setCurrentPage(1);
      };
    
      const openModalC = () => {
        setShowModalC(true);
      };
    
      const closeModal = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
      };
    
      const handleCheckboxChange = () => {
        setOnlyEven(!onlyEven);
      };
    
      const handleSearchChange = e => {
        setSearchQuery(e.target.value);
      };
    
      const filteredContacts = onlyEven ? contacts.filter(contact => contact.id % 2 === 0) : contacts;
    
      const filteredModalContacts = modalContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    
return (

    <div className="container">
        <div className="row justify-content-center mt-5">
            <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

            <div className="d-flex justify-content-center gap-3">
                <button onClick={openModalA} style={{ backgroundColor: showModalA ? 'green' : '' }} 
                className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                <button onClick={openModalB} style={{ backgroundColor: showModalB ? 'blue' : '' }} 
                className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                
                {showModalA && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal A</h2>
            <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
            <ul>
              {filteredModalContacts.map(contact => (
                <li key={contact.id} onClick={openModalC}>
                  {contact.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-actions">
            <button onClick={openModalA} style={{ backgroundColor: 'green' }}>
              Modal Button A
            </button>
            <button onClick={openModalB}>Modal Button B</button>
            <button onClick={closeModal}>Modal Button C</button>
          </div>
        </div>
      )}

      {showModalB && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal B</h2>
            <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
            <ul>
              {filteredModalContacts.map(contact => (
                <li key={contact.id} onClick={openModalC}>
                  {contact.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-actions">
            <button onClick={openModalA} style={{ backgroundColor: showModalA ? 'green' : '' }}>
              Modal Button A
            </button>
            <button onClick={openModalB} style={{ backgroundColor: 'blue' }}>
              Modal Button B
            </button>
            <button onClick={closeModal}>Modal Button C</button>
          </div>
        </div>
      )}

      {showModalC && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal C</h2>
            {/* Display contact details */}
          </div>
          <div className="modal-actions">
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </div>
      )}

      <footer>
        <label>
          <input type="checkbox" checked={onlyEven} onChange={handleCheckboxChange} />
          Only even
        </label>
      </footer>

            </div>

        </div>
    </div>
);
};
export default Problem2;