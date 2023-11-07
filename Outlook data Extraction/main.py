import win32com.client
from bs4 import BeautifulSoup
import pandas as pd

# Getting message content from last received email on the inbox
outlook = win32com.client.Dispatch('Outlook.Application').GetNamespace('MAPI')
default_inbox = outlook.GetDefaultFolder(6)
inbox = default_inbox.Items
last_message = inbox.GetLast()
html_message = last_message.HTMLBody

# Getting parser table


# getting headers from the HTML file
list_header = []
soup = BeautifulSoup(html_message, 'html.parser')
header = soup.find_all('table')[0].find('tr')

for items in header:
    try:
        list_header.append(items.get_text())
    except:
        continue

# Getting data
data = []
html_data = soup.find_all('table')[0].find_all('tr')[1:]

for element in html_data:
    sub_data = []
    for sub_element in element:
        try:
            sub_data.append(sub_element.get_text())
        except:
            continue
    data.append(sub_data)

# creating dataframe
dataFrame = pd.DataFrame(data = data, columns = list_header)

# Converting to CSV
dataFrame.to_csv('Output.csv')


