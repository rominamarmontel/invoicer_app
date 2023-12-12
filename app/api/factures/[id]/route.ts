import { connectMongoDB } from "@/lib/mongodb"
import Facture from "@/models/facture"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import Company from "@/models/company"
import Client from "@/models/client"
import Payment from "@/models/payment"
import Category from "@/models/category"
import Item from "@/models/item"
import Commission from "@/models/commission"
import { RowProps } from "@/types"
import Row from "@/models/row"

export const PUT = async(req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {id} = params
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
    subtotal,
    commission,
    allTotal,
  } = await req.json()

  const getCompanyInfoByName = async (companyName: string) => {
    const companyData = await Company.findOne({ name: companyName });
    if (!companyData) {
      throw new Error('Company not found');
    }
    return companyData;
  };

  const getClientInfoByName = async (clientName: string) => {
      const clientData = await Client.findOne({ clientName: String(clientName) });
      if (!clientData) {
        throw new Error('Client not found');
      }
      return clientData;
  };
  
  const getPaymentInfoByName = async (bankName: string) => {
      const paymentData = await Payment.findOne({ bankName: String(bankName) });
      if (!paymentData) {
        throw new Error('Payment not found');
      }
      return paymentData;
  };

  const getCategoryInfoByName = async (catName: string) => {
    const categoryData = await Category.findOne({ catName: String(catName) });
    if (!categoryData) {
      throw new Error('Category not found');
    }
    return categoryData;
  };

  const getItemInfoByName = async (itemName: string) => {
    const itemData = await Item.findOne({'itemName.fr': itemName
    })
    if (!itemData) {
      throw new Error('Item not found')
    }
    return itemData
  }

  const getCommissionInfoByName = async(commissionName: string) => {
    const commissionData = await Commission.findOne({commissionName: String(commissionName)})
    if (!commissionData) {
      throw new Error('Commission not found')
    }
    return commissionData
  }

  const formattedRows = await Promise.all((rows as Array<RowProps>).map(async (row) => {
    const rowCategory = String(row.category)
    const category = await getCategoryInfoByName(rowCategory);
    const rowItem = String(row.item)
    const item = await getItemInfoByName(rowItem);
    if (!category) {
      throw new Error('Category not found');
    }
    if (!item) {
      throw new Error('Item not found');
    }
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

let newRows = [];
for (let i = 0; i < formattedRows.length; i++) {
  const newRow = await Row.create({
    category: formattedRows[i].category,
    item: formattedRows[i].item,
    itemPlus: formattedRows[i].itemPlus,
    qty: formattedRows[i].qty,
    price: formattedRows[i].price,
    unit: formattedRows[i].unit,
    total: formattedRows[i].total,
  });
  await newRow.populate('category item');
  await newRows.push(newRow)
}

  await connectMongoDB()
  await Facture.findByIdAndUpdate(id, {
    company: await getCompanyInfoByName(company),
    client: await getClientInfoByName(client),
    factureDate,
    factureNumber,
    conditionPayment,
    paymentDue,
    title,
    rows: newRows,
    note,
    payment: await getPaymentInfoByName(payment),
    subtotal,
    commission: await getCommissionInfoByName(commission),
    allTotal,
  })
  return NextResponse.json({message:"Facture updated"}, {status: 200})
}

export const GET = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const facture = await Facture.findOne({_id: id})
  return NextResponse.json({facture}, {status: 200})
}

export const DELETE = async(req:Request,{params}:{params:{id:string}}) => {
  const {id} = params
  await connectMongoDB()
  await Facture.findByIdAndDelete({_id: id})
  return NextResponse.json({message:"Facture deleted"}, {status:200})
}