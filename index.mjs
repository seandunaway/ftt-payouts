#!/usr/bin/env node

import {readFileSync} from 'node:fs'

let data = {}
let total_paid_count = 0
let total_paid_amount = 0

let filename = process.argv[2] || './data.csv'
let file = await readFileSync(filename, 'ascii')
let matches = file.matchAll(/Paid to (?<email>.+)@.*,-(?<amount>[\d\.]+)/g)

for (let match of matches) {
	let email = match?.groups?.email
	let amount = match?.groups?.amount
	if (!email || !amount) continue

	let char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
	let position = Math.floor(Math.random() * email.length + 1)
	let email_obfuscate = email.slice(0, position) + char + email.slice(position)

	let amount_float = parseFloat(amount)

	if (!data[email]) data[email] = {count: 0, amount: 0}
	data[email].count++
	data[email].amount += amount_float

	total_paid_count++
	total_paid_amount += amount_float
}

let data_entries = Object.entries(data)
let data_sort = data_entries.sort(function ([, {amount: a}], [, {amount: b}]) {return b - a})

console.info(`\
total_paid_count: ${total_paid_count}
total_paid_amount: ${total_paid_amount}
`)

console.dir(data_sort, {depth: 3, maxArrayLength: 10000})
