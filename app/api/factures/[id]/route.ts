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
import { ObjectId } from 'mongodb';


export const PUT = async(req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  const {id} = params

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

    const getCompanyInfoById = async (companyId: string) => {
      const companyData = await Company.findById(companyId)
      if (!companyData) {
        throw new Error(`Company not found: ${companyId}`)
      }
      return companyData
    }

    const getClientInfoById = async (clientId: string) => {
      const clientData = await Client.findById(clientId)
      if (!clientData) {
        throw new Error('Client not found')
      }
      return clientData
    }

    const getPaymentInfoById = async (paymentId: string) => {
      const paymentData = await Payment.findById(paymentId)
      if (!paymentData) {
        throw new Error('Payment not found')
      }
      return paymentData
    }

    const getCommissionInfoById = async (commissionId: string) => {
      const commissionData = await Commission.findById(commissionId)
      if (!commissionData) {
        throw new Error('Commission not found')
      }
      return commissionData
    }

    const getCategoryInfoById = async (categoryId: string) => {
      const categoryData = await Category.findById(categoryId)
      if (!categoryData) {
        throw new Error('Category not found')
      }
      return categoryData
    }

    const getItemInfoById = async (itemId: string) => {
      const itemData = await Item.findById(itemId)
      if (!itemData) {
        throw new Error('Item not found')
      }
      return itemData
    }

    const formattedRows = await Promise.all((rows as Array<RowProps>).map(async (row) => {
      const rowCategory = String(row.category)
      const category = await getCategoryInfoById(rowCategory)
      const rowItem = String(row.item)
      const item = await getItemInfoById(rowItem)

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

    const updatedFacture = await Facture.findByIdAndUpdate(id, {
      company: await getCompanyInfoById(company),
      client: await getClientInfoById(client),
      factureDate,
      factureNumber,
      conditionPayment,
      paymentDue,
      title,
      rows: newRows,
      note,
      payment: await getPaymentInfoById(payment),
      commission: await getCommissionInfoById(commission),
    }, { new: true })

    await updatedFacture.populate('company client payment commission')
    return NextResponse.json({ res: updatedFacture })
  } catch (error) {
    console.error('Error updating Facture:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const GET = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const facture = await Facture.findOne({_id: id})
  return NextResponse.json({facture}, {status: 200})
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const factureToDelete = await Facture.findById(id);
  if (!factureToDelete) {
    return NextResponse.json({ message: "Facture not found" }, { status: 404 });
  }
  const rowIdsToDelete = factureToDelete.rows;
  await Facture.findByIdAndDelete(id);
  if (rowIdsToDelete && rowIdsToDelete.length > 0) {
    await Row.deleteMany({ _id: { $in: rowIdsToDelete } });
  }

  return NextResponse.json({ message: "Facture and Rows deleted" }, { status: 200 });
};