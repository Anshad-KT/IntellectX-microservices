"use client"
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import auth from '@/services/axios';

const InviteLinkGenerator = () => {
  const [inviteLink, setInviteLink] = useState('');

  const generateAndCopyInviteLink = async () => {
    // Replace this with your actual logic to generate the invite link

   
    const fetchData = async () => {
        const response = await auth.get('/api/company/generatelink');
        console.log(response.data,"xxxxxx"); 
        return response.data
    };
    const generatedLink = await fetchData()
    console.log(generatedLink,"generatedLink");
    
    setInviteLink(generatedLink.link);
    clipboardCopy(inviteLink)
    .then(() => {
      console.log('Link copied to clipboard');
    }) 
    .catch((error) => {
      console.error('Error copying link to clipboard:', error);
    });
  };

  return (
    <div className="flex items-center mt-10">
      <button
        className="bg-primary hover:secondary text-white  py-2 px-4 rounded"
        onClick={generateAndCopyInviteLink}
      >
        Generate and Copy Invite Link
        
      </button>
    </div>
  );
};

export default InviteLinkGenerator;
