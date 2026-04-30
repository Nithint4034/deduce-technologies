import React, { useState } from 'react';
import SideNav from './travelshoot/SideNav';
import './TravelshootDashboard.css';

function TravelshootDashboard({ onLogout }) {
  // Total Count Table states
  const [tableOpen, setTableOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [tableError, setTableError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // User Details Search states
  const [userSearchOpen, setUserSearchOpen] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoadingUsernames, setIsLoadingUsernames] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Load usernames when component mounts
  React.useEffect(() => {
    loadUsernames();
  }, []);

  const loadUsernames = async () => {
    setIsLoadingUsernames(true);
    setUsernameError('');
    
    try {
      const response = await fetch('https://74zys1w4sj.execute-api.ap-south-1.amazonaws.com/test/get-usernames');
      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }
      
      const data = await response.json();
      const usernameList = Array.isArray(data) ? data : data.usernames || [];
      setUsernames(usernameList);
    } catch (error) {
      setUsernameError(error.message || 'Unable to load usernames');
      setUsernames([]);
    } finally {
      setIsLoadingUsernames(false);
    }
  };

  // Handle Total Count Table
  const handleOpenTable = async () => {
    setTableError('');
    setTableOpen(true);
    setIsLoadingTable(true);

    try {
      const response = await fetch('https://74zys1w4sj.execute-api.ap-south-1.amazonaws.com/test/totalcount');
      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }

      const json = await response.json();
      setTableData(Array.isArray(json) ? json : []);
    } catch (error) {
      setTableError(error.message || 'Unable to load count table');
      setTableData([]);
    } finally {
      setIsLoadingTable(false);
    }
  };

  // Handle User Details Search
  const handleOpenUserSearch = () => {
    setUserSearchOpen(true);
    // Reset form when opening
    setSelectedUsername('');
    setSelectedDate('');
    setSearchResult(null);
  };

  const handleSearchSubmit = async () => {
    if (!selectedUsername) {
      alert('Please select a username');
      return;
    }
    
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    
    setIsSearching(true);
    setSearchResult(null);
    
    try {
      const apiUrl = `https://74zys1w4sj.execute-api.ap-south-1.amazonaws.com/test/download-images?username=${encodeURIComponent(selectedUsername)}&date=${selectedDate}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      setSearchResult(result);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(`Error: ${error.message}`);
      setSearchResult({ error: error.message });
    } finally {
      setIsSearching(false);
    }
  };

  // Filter data based on search term (username only)
  const filteredData = tableData.filter(row => {
    if (!searchTerm) return true;
    return row.username && row.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="dashboard-page">
      <SideNav onOpenCountTable={handleOpenTable} onOpenUserSearch={handleOpenUserSearch} />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Travelshoot Dashboard</h1>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>

        {/* Total Count Table Section */}
        {tableOpen && (
          <div className="count-table-card">
            <div className="count-table-header">
              <h3>Total Count Table</h3>
              <button 
                className="close-table-button"
                onClick={() => setTableOpen(false)}
              >
                ✕
              </button>
            </div>
            {isLoadingTable && <span className="count-loading">Loading...</span>}
            
            {/* Search Section */}
            {!isLoadingTable && !tableError && tableData.length > 0 && (
              <div className="search-container">
                <div className="search-input-wrapper">
                  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="clear-search"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="search-info">
                  Found {filteredData.length} of {tableData.length} entries
                </div>
              </div>
            )}
            
            {tableError ? (
              <div className="count-error">{tableError}</div>
            ) : (
              !isLoadingTable && (
                <table className="count-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.username}</td>
                          <td>{row.count}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="no-data">
                          {searchTerm ? 'No matching results found' : 'No data available'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )
            )}
          </div>
        )}

        {/* User Details Search Section */}
        {userSearchOpen && (
          <div className="user-search-card">
            <div className="user-search-header">
              <h3>User Details Search</h3>
              <button 
                className="close-search-button"
                onClick={() => {
                  setUserSearchOpen(false);
                  setSelectedUsername('');
                  setSelectedDate('');
                  setSearchResult(null);
                }}
              >
                ✕
              </button>
            </div>
            
            <div className="user-search-content">
              {usernameError ? (
                <div className="error-message">{usernameError}</div>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Select User</label>
                      {isLoadingUsernames ? (
                        <div className="loading-spinner">Loading usernames...</div>
                      ) : (
                        <select 
                          value={selectedUsername} 
                          onChange={(e) => setSelectedUsername(e.target.value)}
                          className="user-select"
                        >
                          <option value="">-- Select a username --</option>
                          {usernames.map((username, index) => (
                            <option key={index} value={username}>
                              {username.trim()}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="date-input"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group button-group">
                      <button 
                        className="search-submit-button"
                        onClick={handleSearchSubmit}
                        disabled={isSearching || isLoadingUsernames || !selectedUsername || !selectedDate}
                      >
                        {isSearching ? 'Searching...' : 'Search Details'}
                      </button>
                    </div>
                  </div>

                  {/* Display Search Result */}
                  {searchResult && (
                    <div className="search-result">
                      <h4>Search Result:</h4>
                      <pre className="result-json">
                        {JSON.stringify(searchResult, null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Show message when no section is open */}
        {!tableOpen && !userSearchOpen && (
          <div className="welcome-message">
            <p>Click on any tool from the sidebar to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TravelshootDashboard;