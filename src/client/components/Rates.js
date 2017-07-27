import React from 'react'

export default (props) => {
  return (
    <div className="tableroot">
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
                <td className="product-name">{product.name}</td>
                <td className="cost">{product.range}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}