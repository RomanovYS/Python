# Пользователь вводит данные о количестве предприятий, их наименования и прибыль за 4 квартал (т.е. 4 числа)
# для каждого предприятия. Программа должна определить среднюю прибыль (за год для всех предприятий) и отдельно
# вывести наименования предприятий, чья прибыль выше среднего и ниже среднего.
import collections as coll

NT = 4  # количество отрезков времени (в данном случае кварталы) N Times
TI = 'квартал'  # наименование Time Interval
rep_dict = coll.OrderedDict()  # словарь отчёта
profit_avg = 0  # средний профит
outsiders = []
leaders = []

n = int(input('Сколько предприятий будем оценивать? '))
for _ in range(n):
    company = input('Наименование компании: ')
    profit_list = []  # инициализируем новый экземпляр списка с прибылями
    for i in range(NT):  # проходим по всем отрезкам времени
        profit_list.append(
            float(input('Введите прибыль за {} {}: '.format(i + 1, TI))))  # вводим прибыль и помещаем в список
    rep_dict[company] = profit_list, sum(profit_list)  # заносим в словарь данные о прибыли по компании и их сумму
    profit_avg += rep_dict[company][1]  # суммируем с суммарной суммой для нахождения среднего ))
profit_avg /= n  # вычисляем среднюю прибыль
for i in rep_dict:  # мухи <- / -> котлеты
    if profit_avg < rep_dict[i][1]:  # если больше среднего - в лидеры
        leaders.append(i)
    elif profit_avg > rep_dict[i][1]:  # если меньше среднего - в аутсайдеры
        outsiders.append(i)

print('*' * 25)
print('Summary\n', rep_dict)
print('Средняя прибыль :', profit_avg)
if len(leaders) > 0:
    print('*' * 25, '\nКомпании с профитом выше среднего:')
    for i in leaders:
        print(i, '-> ', rep_dict[i][1])
if len(outsiders) > 0:
    print('*' * 25, '\nКомпании с профитом ниже среднего:')
    for i in outsiders:
        print(i, '-> ', rep_dict[i][1])
if (len(leaders) == 0) or (len(outsiders) == 0):
    print('*' * 25, '\nНет лидеров или аутсайдеров!')
