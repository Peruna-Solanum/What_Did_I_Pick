import os
import subprocess
import tkinter as tk 
from tkinter import filedialog
import sqlite3
def main(): 
    print('ji')
    currentDir = os.getcwd()
    print('Welcome to the music file creator. This turns the db file into a json file')
    print('1. Choose the db file you want to use:')
    # # subprocess.Popen(f'explorer "{currentDir}"')
    # subprocess.run(f'explorer', '/select', currentDir)
    tks = tk.Tk()
    tks.withdraw()
    file_path = filedialog.askopenfilename(initialdir = currentDir)
    print('File Chosen: ', file_path)
    print('Enter new JSON file name: ')
    new_file_name = input('--> ')
    print('Creating file now')
    create_json(file_path, new_file_name)
def create_json(reference_file, new_file_name): 
    try:
        sqliteConnection = sqlite3.connect(reference_file)
        cursor = sqliteConnection.cursor()
        cursor.execute('SELECT name, SongOrder, date1, date2, date3, date4, issues FROM SongList')
        response = cursor.fetchall()
        print(response)
        file_contents = '{ "songs": ['
        for x in response:
            y = 0
            if (x[y] == "None"):
                x[y] == ""
                y += 1
            file_contents = file_contents + '{"name": "'+ str(x[0]) + '","songOrder": "'+ str(x[1]) +'", "date1": "' +  str(x[2]) +'", "date2": "' +  str(x[3]) +'", "date3": "' +  str(x[4]) +'", "date4": "' + str(x[5]) +'", "issues": "' +  str(x[6]) +'"}, \n'
        new_json = open((new_file_name + '.json'), "x")
        new_json.write(str(file_contents[:-3] + ']}'))
    except sqlite3.Error as error :
        print('SQL Error: ', error)
    finally:
        sqliteConnection.close()
        print('Congratulations, the new file has been made.')
if __name__ == '__main__':
    main()