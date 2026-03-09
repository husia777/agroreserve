// API функции документов
import { apiClient } from './client'
import type { Document, PaginatedResponse } from '@/types'

// Параметры запроса документов
export interface DocumentsParams {
  doc_type?: string
  date_from?: string
  date_to?: string
  order_id?: string
  page?: number
  per_page?: number
}

// Получение списка документов
export const getDocuments = async (params?: DocumentsParams): Promise<PaginatedResponse<Document>> => {
  const response = await apiClient.get<PaginatedResponse<Document>>('/documents', { params })
  return response.data
}

// Получение документа по ID
export const getDocument = async (docId: string): Promise<Document> => {
  const response = await apiClient.get<Document>(`/documents/${docId}`)
  return response.data
}

// Скачивание документа в PDF
export const downloadDocument = async (docId: string): Promise<Blob> => {
  const response = await apiClient.get(`/documents/${docId}/download`, {
    responseType: 'blob',
  })
  return response.data
}

// Скачивание документов за период (ZIP)
export const downloadDocumentsZip = async (params: {
  date_from: string
  date_to: string
  doc_types?: string[]
}): Promise<Blob> => {
  const response = await apiClient.post('/documents/download-zip', params, {
    responseType: 'blob',
  })
  return response.data
}

// Скачивание всех сертификатов по заказу (ZIP)
export const downloadOrderCertificates = async (orderId: string): Promise<Blob> => {
  const response = await apiClient.get(`/orders/${orderId}/certificates/download`, {
    responseType: 'blob',
  })
  return response.data
}

// Вспомогательная функция скачивания blob
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
