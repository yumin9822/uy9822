# coding: utf-8
from selenium import webdriver

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-extensions')
#chrome_options.add_argument('--proxy-server=socks5://127.0.0.1:9050')
chrome_options.add_argument("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3383.0 Safari/537.36")

client = webdriver.Chrome(chrome_options=chrome_options, executable_path='/root/chromedriver')
client.get("http://checkip.dns.he.net/")
#client.get("https://httpbin.org/get?show_env=1")
#client.get("https://www.multcloud.com/share/0c7716c2-1f7b-42b3-9e53-e5caecfb502a")

content = client.page_source.encode('utf-8')
print content
#client.get_screenshot_as_file('01.png')
client.quit()
