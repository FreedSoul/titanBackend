import win32com.client
import pandas as pd
from io import StringIO
import numpy as np
import os
from bs4 import BeautifulSoup

# Getting message content from last received email on the inbox
outlook = win32com.client.Dispatch('Outlook.Application').GetNamespace('MAPI')
default_inbox = outlook.GetDefaultFolder(6)
inbox = default_inbox.Items
last_message = inbox.GetLast()
html_message = last_message.HTMLBody

# converts the HTML table to a list
file = StringIO(html_message)
table = pd.read_html(file)

# get headers and the number of headers of the list
list_header = []
soup = BeautifulSoup(html_message, 'html.parser')
header = soup.find_all('table')[0].find('tr')

for items in header:
    list_header.append(items.get_text())

columns = len(list_header)

# get the number of rows of the list
row = [len(x) for x in table][0]

# Converts list to np.array then to a Pandas data frame
num = np.array(table)
reshaped = num.reshape(row, columns)
df = pd.DataFrame(reshaped)

# prints to console the data frame and saves file as .csv
df.to_csv('output.csv', header=False, index=False)

# Read the CSV file
df = pd.read_csv('output.csv')

# Remove rows with empty values in the specified columns
df.dropna(subset=['AGGREGATE SOURCE', 'QTY',], inplace=True)

# Write the cleaned dataframe to a new CSV file
df.to_csv('final_output.csv', index=False)

# delete first output file
if os.path.exists("output.csv"):
    os.remove("output.csv")
else:
    print("The file does not exist")
