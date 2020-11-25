import OpenDartReader

# ==== 0. 객체 생성 ====
# 객체 생성 (API KEY 지정) 
api_key = '365c9909f6ce1ba811ec45d3dc46cfc9853ce05f'
dart = OpenDartReader(api_key) 

finstate = dart.finstate('033290', 2018)
print(finstate)

liabilities = finstate[(finstate['account_nm'] == '부채총계')]['thstrm_amount'].size
equality = finstate[(finstate['account_nm'] == '자본총계')]['thstrm_amount'].iloc[0]
                
# debtRatio = "%0.3f" % ((float(liabilities) / float(equality)) * 100)

print(liabilities)
print(equality)


# print(debtRatio)