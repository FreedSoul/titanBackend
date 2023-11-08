from bs4 import BeautifulSoup
from io import StringIO
import win32com.client
import pandas as pd
import numpy as np
import json
import csv
import os

# Google Drive path
g_path = r'G:\My Drive\Daily loads'

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
df.to_csv(r'G:\My Drive\Daily loads\Temp\output.csv', header=False)

# Read the CSV file
df = pd.read_csv(r'G:\My Drive\Daily loads\Temp\output.csv')

# Remove rows with empty values in the specified columns
df.dropna(subset=['AGGREGATE SOURCE', 'QTY',], inplace=True)

# Removes columns with 'Unnamed' value.
for col in df.columns:
    if 'Unnamed' in col:
        del df[col]

# Write the cleaned dataframe to a new CSV file
df.to_csv(r'G:\My Drive\Daily loads\final_output.csv', index=False)

# delete first output file
if os.path.exists(r'G:\My Drive\Daily loads\Temp\output.csv'):
    os.remove(r'G:\My Drive\Daily loads\Temp\output.csv')
else:
    print("The file does not exist")


def make_json(csv_path, json_path):
    # create a dictionary
    data = {}

    # Open a csv reader called DictReader
    with open(csv_path, encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        # Convert each row into a dictionary
        # and add it to data
        for rows in csv_reader:
            key = rows['0']
            data[key] = rows

    # Open a json writer, and use the json.dumps() function to dump data
    with open(json_path, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


# Decide the two file paths
csv_file_path = r'G:\My Drive\Daily loads\final_output.csv'
json_file_path = r'G:\My Drive\Daily loads\json_output.json'

# Call the make_json function
make_json(csv_file_path, json_file_path)
