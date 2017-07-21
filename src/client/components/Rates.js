import React from 'react'

export default (props) => {
  return (
    <div>
      <table className="pricing-table">
        <thead>
          <tr>
            <th className="provider-name">{props.name}</th>
          </tr>
        </thead>
        <tbody>
          {props.provider.map(product => {
            return (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.range}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}