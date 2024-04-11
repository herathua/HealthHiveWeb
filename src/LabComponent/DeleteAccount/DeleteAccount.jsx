import React from 'react'

function DeleteAccount() {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      
        <h2 className="text-lg font-semibold mb-4">Delete Account</h2>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
  )
}
export default DeleteAccount