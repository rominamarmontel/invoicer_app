import Facture from "@/models/facture";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Row from '@/models/row'
import Company from "@/models/company";
import Client from "@/models/client";
import Payment from "@/models/payment";
import { RowProps } from "@/types";
import FactureNumber from '@/models/factureNumber'
import Category from "@/models/category";
import Item from "@/models/item";
import Commission from "@/models/commission";
import { ObjectId } from 'mongodb';


export const GET = async(req:Request) => {
  await connectMongoDB()
  const factures = await Facture.find().sort({ createdAt: -1 });
  return NextResponse.json({factures})
}

export const POST = async(req:Request) => {
  try {
  await connectMongoDB()
  const {
  company,
  client,
  factureDate,
  factureNumber,
  conditionPayment,
  paymentDue,
  title,
  note,
  payment,
  rows,
  commission,
  } = await req.json()

  const getNextFactureNumber = async () => {
    const lastFactureNumberDoc = await FactureNumber.findOne()
    let lastFactureNumber
    if (lastFactureNumberDoc) {
      lastFactureNumber = lastFactureNumberDoc.factureNumber
    } else {
      lastFactureNumber = '23/KAZ000'
      await FactureNumber.create({ factureNumber: lastFactureNumber })
    }
    const nextNumberPart = parseInt(lastFactureNumber.split('/')[1].slice(3), 10) + 1
    const nextFactureNumber = `${lastFactureNumber.split('/')[0]}/KAZ${nextNumberPart.toString().padStart(3, '0')}`
    await FactureNumber.findOneAndUpdate({}, { factureNumber: nextFactureNumber })
    return nextFactureNumber
  }

  const getCompanyInfoByName = async (selectedCompanyName: string) => {
    const companyData = await Company.findOne({ _id: new ObjectId(selectedCompanyName) })
    if (!companyData) {
      throw new Error(`Company not found: ${selectedCompanyName}`)
    }
    return companyData
  }

  const getClientInfoByName = async (selectedClientName: string) => {
    const clientData = await Client.findOne({ _id: String(selectedClientName) })
    if (!clientData) {
      throw new Error('Client not found')
    }
    return clientData
  }

  const getPaymentInfoByName = async (selectedPaymentName: string) => {
  const paymentData = await Payment.findOne({ _id: String(selectedPaymentName) })
  if (!paymentData) {
    throw new Error('Payment not found')
  }
  return paymentData
  }

  const getCommissionInfoByName = async(selectedCommissionName: string) => {
    const commissionData = await Commission.findOne({_id: String(selectedCommissionName)})
    if (!commissionData) {
      throw new Error('Commission not found')
    }
    return commissionData
  }

  const getCategoryInfoByName = async (catName: string) => {
    const categoryData = await Category.findOne({ catName: String(catName) })
    if (!categoryData) {
      throw new Error('Category not found')
    }
    return categoryData
  }


  const getItemInfoByName = async (itemName: string) => {
    const itemData = await Item.findOne({ 'itemName.fr': itemName })  
      if (!itemData) {
        throw new Error('Item not found')
      }
      return itemData
  }

  const formattedRows = await Promise.all((rows as Array<RowProps>).map(async (row) => {
    const rowCategory = String(row.category)
    const category = await getCategoryInfoByName(rowCategory)
    const rowItem = String(row.item)
    const item = await getItemInfoByName(rowItem)
  
    return {
      category: category._id,
      item: item._id, 
      itemPlus: row.itemPlus,
      qty: row.qty,
      price: row.price,
      unit: row.unit,
      total: row.total,
    };
  }));

let newRows = []
for (let i = 0; i < formattedRows.length; i++) {
  const newRow = await Row.create({
    category: formattedRows[i].category,
    item: formattedRows[i].item,
    itemPlus: formattedRows[i].itemPlus,
    qty: formattedRows[i].qty,
    price: formattedRows[i].price,
    unit: formattedRows[i].unit,
    total: formattedRows[i].total,
  })
  await newRow.populate('category item')
  await newRows.push(newRow)
}
// console.log('Fetch request body:', JSON.stringify({
//   company,
//   client,
//   factureDate,
//   factureNumber,
//   conditionPayment,
//   paymentDue,
//   title,
//   rows: formattedRows,
//   note,
//   payment,
//   commission,
// }));

const newFacture = await Facture.create({
  company: await getCompanyInfoByName(company),
  client: await getClientInfoByName(client),
  factureDate,
  factureNumber:await getNextFactureNumber(),
  conditionPayment,
  paymentDue,
  title,
  rows: newRows,
  note,
  payment: await getPaymentInfoByName(payment),
  commission: await getCommissionInfoByName(commission),
  })

  await newFacture.populate('company client payment commission')
  return NextResponse.json({res: newFacture})
  } catch (error) {
    console.error('Error creating Facture:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}