import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Path to store the Excel file
const EMAILS_FILE_PATH = path.join(process.cwd(), 'public', 'emails.xlsx');

// Function to read existing emails from Excel file
function readExistingEmails(): string[] {
  try {
    if (fs.existsSync(EMAILS_FILE_PATH)) {
      const workbook = XLSX.readFile(EMAILS_FILE_PATH);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      return data.flat().filter(Boolean) as string[];
    }
  } catch (error) {
    console.error('Error reading emails file:', error);
  }
  return [];
}

// Function to write emails to Excel file
function writeEmailsToExcel(emails: string[]) {
  try {
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([['Email'], ...emails.map(email => [email])]);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Emails');
    
    // Ensure directory exists
    const dir = path.dirname(EMAILS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write file
    XLSX.writeFile(workbook, EMAILS_FILE_PATH);
  } catch (error) {
    console.error('Error writing emails file:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Read existing emails
    const existingEmails = readExistingEmails();

    // Check if email already exists
    if (existingEmails.includes(email)) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 200 }
      );
    }

    // Add new email and write to file
    existingEmails.push(email);
    writeEmailsToExcel(existingEmails);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing email:', error);
    return NextResponse.json(
      { error: 'Failed to store email' },
      { status: 500 }
    );
  }
} 