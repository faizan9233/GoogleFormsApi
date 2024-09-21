import React, { useState } from 'react';
import axios from 'axios';
import { backend_url } from './libs/data';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const [formId, setFormId] = useState('');
  const [formData, setFormData] = useState(null);
  const [formJson, setFormJson] = useState('');
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const [formLink,setFormlint] = useState('')

  const handleExportForm = async () => {
    setLoadingExport(true);
    try {
      const response = await axios.get(`${backend_url}/export-form/${formId}`);
      setFormData(response.data);
      console.log('Exported Form:', response.data);
      toast.success('Form exported successfully!');
    } catch (error) {
      console.error('Error exporting form:', error);
      toast.error('Error exporting form.');
    } finally {
      setLoadingExport(false);
    }
  };

  const handleImportForm = async () => {
    setLoadingImport(true);
    try {
      const res = await axios.post(`${backend_url}/import-form`, JSON.parse(formJson));
      setFormlint(res.data)
      toast.success('Form imported successfully!');
    } catch (error) {
      console.error('Error importing form:', error);
      toast.error('Error importing form.');
    } finally {
      setLoadingImport(false);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    toast.success('JSON copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col justify-center">
      <Toaster position="top-center" />
      <h1 className="font-bold text-4xl text-center mb-6">Google Forms Manager</h1>
      
      <div className="flex flex-col md:flex-row gap-10">
        {/* Export Form Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="font-semibold text-xl mb-4">Export Form</h2>
          <input
            className="p-3 focus:outline-none border rounded-lg w-full mb-4"
            type="text"
            placeholder="Enter Form ID"
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
          />
          <button 
            className={`bg-blue-600 text-white rounded-lg p-2 w-full ${loadingExport ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 transition'}`} 
            onClick={handleExportForm} 
            disabled={loadingExport}
          >
            {loadingExport ? 'Exporting...' : 'Export Form'}
          </button>
        </div>

        {/* Import Form Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="font-semibold text-xl mb-4">Import Form</h2>
          <textarea
            className="p-3 focus:outline-none border rounded-lg w-full mb-4 h-32"
            placeholder="Paste your form JSON here"
            value={formJson}
            onChange={(e) => setFormJson(e.target.value)}
          />
           <input
            className="p-3 focus:outline-none border rounded-lg w-full mb-4"
            type="text"
            value={formLink}
          />

          <button 
            className={`bg-blue-600 text-white rounded-lg p-2 w-full ${loadingImport ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 transition'}`} 
            onClick={handleImportForm} 
            disabled={loadingImport}
          >
            {loadingImport ? 'Importing...' : 'Import Form'}
          </button>
        </div>
      </div>

      {/* Display Form Data */}
      {formData && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-4">Form Data:</h3>
          <button 
            className="mt-4 bg-green-600 text-white rounded-lg p-2 hover:bg-green-500 transition" 
            onClick={handleCopyJson}
          >
            Copy JSON to Clipboard
          </button>
          <pre className="bg-gray-200 p-4 rounded-lg">{JSON.stringify(formData, null, 2)}</pre>
         
        </div>
      )}
    </div>
  );
};

export default App;
