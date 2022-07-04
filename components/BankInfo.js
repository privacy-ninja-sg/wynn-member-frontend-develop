import { useEffect, useState } from 'react'

const BankInfo = (props) => {
  const {bank_id, name, logo, name_th, bank_account_name} = props.data
  return (
    <div className="rounded-md border-1 bg-zinc-800 border-black w-full h-40 mt-2">
      <div className="flex flex-row">
          <div className="rounded-full">
              <img className="mt-7 h-16 pl-4" src={logo} />
          </div>
          <div className="mt-5 pl-3 text-gray-100">
            <p className="text-red-700 text-lg">{bank_id}</p>
            <p className="text-sm">{name_th}</p>
            <p className="text-base">{bank_account_name}</p>
          </div>
      </div>
      <div className="mt-2 text-center">
        <button>
          <img className="h-12" src="/img/copy_bank_account.png" />
        </button>
      </div>
    </div>
  )
}

export default BankInfo